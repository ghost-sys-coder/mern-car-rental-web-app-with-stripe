import { Dispatch, SetStateAction, useEffect, ChangeEvent } from "react"
import { Trash2, Upload } from "lucide-react"
import { Input } from "../ui/input"
import { IBlogProps } from "types"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/utils/firebase"
import toast from "react-hot-toast"
import { toastError, toastSuccess } from "@/constants"
import { Button } from "../ui/button"

interface ImageProps {
    setDetails: Dispatch<SetStateAction<IBlogProps>>;
    file: File | null;
    media: string;
    setFile: Dispatch<SetStateAction<File | null>>;
    setMedia: Dispatch<SetStateAction<string>>;
}

const ImageUploader = ({ setDetails, file, media, setFile, setMedia }: ImageProps) => {
    


    /** handle file change */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {

            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            /** Prevent upload if there is already uploaded image, prompt the user to delete the present image first */
            if (!media) {
                setFile(selectedFile);
            } else {
                toast.error("Please delete the current image first!", toastError);
            }
        }
    }


    /** handle details update */
    useEffect(() => {
        if (!file) return;

        const onUpload = () => {
            const metadata = {
                contentType: file?.type
            };

            const fileName = new Date().getTime() + "_" + file?.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            uploadTask.on(
                "state_changed", (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    toast.loading("Upload is " + progress + "% done", {
                        position: "top-right",
                        duration: 2000
                    })
                },
                (error) => {
                    console.log("There was an error", error);
                    toast.error("There was an error", toastError);
                },

                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMedia(downloadURL);
                        setDetails((prevData) => ({
                            ...prevData,
                            image: downloadURL
                        }));
                        setFile(null);

                        toast.success("Image upload successfull", toastSuccess);
                    })
                }
            )

        }

        onUpload();

    }, [file, setDetails, setFile, setMedia]);


    /** handle delete image */
    const handleDeleteImage = async () => {
        if (!media) {
            return toast.error("No Image Found!");
        }
        try {
            const storageRef = ref(storage, media);
            await deleteObject(storageRef);
            setMedia('');
            setDetails((prevData) => ({
                ...prevData,
                image: ""
            }))
            toast.success("Image has been deleted!", toastSuccess);
        } catch (error) {
            console.log("Error deleting image", error);
            toast.error("Failed to delete image!", toastError);
        }
    }

    return (
        <div className="my-2">
            {!media && (
                <label htmlFor="file" className="cursor-pointer">
                    <div className="flex justify-start items-center gap-2">
                        <Upload />
                        <span>Upload main image</span>
                    </div>
                    <Input
                        id="file"
                        name="file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}
            <div className="sm:w-[500px] w-full rounded-md overflow-hidden flex flex-col gap-2">
                {media && (
                    <>
                        <img src={media}
                            alt="image"
                            className="w-full sm:h-[350px] h-[250px] object-cover"
                        />
                        <Button
                            onClick={handleDeleteImage}
                            className="flex gap-2 justify-center items-center">
                            <Trash2 />
                            <span>Delete Image</span>
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ImageUploader