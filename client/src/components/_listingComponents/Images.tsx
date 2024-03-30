import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { IStepperMethods } from "types";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";
import { toastError, toastSuccess } from "../../constants";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/utils/firebase";
import { useRentalListingStore } from "@/context/AddRentalContext";
import { useAuthContext } from "@/context/AuthContext";
import { useRentalProvider } from "@/context/RentalContext";
import ButtonContainer from "./ButtonContainer";
import { arrayMove } from "react-sortable-hoc";
import SortableList from "../shared/SortableList";

const Images = ({ handlePreviousStep }: IStepperMethods) => {
  const {
    userProfile: { _id },
  } = useAuthContext();
  const { fetchRentals } = useRentalProvider();
  const rentalStore = useRentalListingStore();
  const navigate = useNavigate();

  const [media, setMedia] = useState<string[]>(rentalStore.data.images || []);
  const [files, setFiles] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  /** handle userId */
  useEffect(() => {
    rentalStore.updateState({
      creator: _id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  /** save images with firebase */
  useEffect(() => {
    const onUpload = async () => {
      if (!files) return;

      const urls: string[] = [];

      const uploadTasks = Array.from(files).map((file) => {
        const metadata = {
          contentType: file.type,
        };

        const fileName = new Date().getTime() + "_" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            toast.loading("Upload is " + progress + "% done", {
              duration: 3000,
              position: "top-right",
            });
          },
          (error) => {
            console.log("There was an error", error);
            toast.error("There was an error", toastError);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              urls.push(downloadURL);

              if (urls.length === files.length) {
                setMedia((prevMedia) => [...prevMedia, ...urls]);
                rentalStore.updateState({
                  images: [...media, ...urls],
                });
                setPreview(true);
                toast.success("Image uploaded successfully!", toastSuccess);
              }
            });
          }
        );

        return uploadTask;
      });

      try {
        await Promise.all(uploadTasks);
      } catch (error) {
        // console.log("Error uploading files", error);
        toast.error("Error uploading images", toastError);
      }
    };

    onUpload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  /** delete a single image from firebase */
  const handleDeleteImage = async (url: string) => {
    try {
      /** find the index of the image to be deleted */
      const index = media.findIndex((imageUrl) => imageUrl === url);

      if (index === -1) return;

      /** delete the image from firebase */
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);

      /** remove the image url from the media state */
      const updatedMedia = [...media];
      updatedMedia.splice(index, 1);
      setMedia(updatedMedia);

      /** update the images array in the store */
      rentalStore.updateState({
        images: updatedMedia,
      });

      toast.success("Image has been deleted!", toastSuccess);
    } catch (error) {
      console.error("Error deleting image", error);
      toast.error("Error deleting image", toastError);
    }
  };

  /** create a new rental */
  const handleCreateRental = async () => {
    setLoading(true);

    try {
      const { data, status } = await axios.post("/cars/create", {
        item: rentalStore.data,
      });

      toast.success(data.message, toastSuccess);
      rentalStore.restart();
      setMedia([]);
      fetchRentals();
      if (status === 200) {
        navigate("/add-rental");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error", toastError);
    } finally {
      setLoading(false);
    }
  };

  /** handle file change */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  /** handle sort end */
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newMedia = arrayMove(media, oldIndex, newIndex);
    setMedia(newMedia);
    rentalStore.updateState({ images: newMedia });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 justify-between items-center">
        <h2 className="text-gray-500 sm:text-xl">Add Car Images</h2>
        <label
          htmlFor="file"
          className="flex justify-center items-center gap-2 cursor-pointer bg-gray-200 py-2 px-2 rounded-md"
        >
          <Upload />
          <span className="text-primary">File Upload</span>
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          id="file"
          type="file"
          accept="image/*"
          multiple
          className="cursor-pointer hidden"
          onChange={handleFileChange}
        />
        {preview && (
          <SortableList
            items={media}
            onSortEnd={onSortEnd}
            onDelete={handleDeleteImage}
            axis="xy"
          />
        )}
      </div>
      <ButtonContainer
        handlePreviousStep={handlePreviousStep}
        text="Submit New Rental"
        handleFunction={handleCreateRental}
        loading={loading}
      />
    </div>
  );
};

export default Images;
