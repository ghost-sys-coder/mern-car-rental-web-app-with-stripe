import { ChangeEvent, useState } from "react"
import Section from "@/components/shared/Section"
import { Input } from "@/components/ui/input"
import { BlogDescription, ImageUploader } from "@/components";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "@/constants";
import { Loader } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";


const CreateBlog = () => {
  const { userProfile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    creator: userProfile._id,
    title: "",
    description: "",
    image: "",
    tags: ""
  });

  /** image files */
  const [media, setMedia] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  
  /** blog description value for react-quill*/
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDetails((prevValue)=> ({...prevValue, [name]: value}))
  }

  const handleCreateBlog = async () => {

    if (!details.creator || !details.description || !details.title || !details.image || !details.tags) {
      return toast.error("All fields are required!", toastError);
    }

    setLoading(true);

    try {
      const { data, status } = await axios.post("/blogs", {
        creator: details.creator,
        title: details.title,
        description: details.description,
        image: details.image,
        tags: details.tags
      });
      toast.success(data.message, toastSuccess);

      if (status === 200) {
        setDetails({
          creator: userProfile._id,
          title: "",
          description: "",
          image: "",
          tags: ""
        });
        setMedia("");
        setFile(null);
        setValue("")
      }
    } catch (error) {

      let message = 'Failed to create blog';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message, toastError);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Section classes="min-h-screen flex flex-col gap-3 items-center">
      <h1 className="text-xl sm:text-3xl font-semibold text-primary">Create a new blog</h1>

      <div className="create-blog_container">
        <div className="input-container">
          <label htmlFor="title">Blog Title:</label>
          <Input
            id="title"
            name="title"
            placeholder="Provide a title for your blog..."
            value={details.title}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <ImageUploader
            setDetails={setDetails}
            media={media}
            file={file}
            setMedia={setMedia}
            setFile={setFile}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Add a Blog Description</label>
          <BlogDescription
            setDetails={setDetails}
            value={value}
            setValue={setValue}
          />
        </div>
        <div className="input-container">
          <label htmlFor="tags">Provide Tags for this blog</label>
          <Input
            value={details.tags}
            onChange={handleChange}
            name="tags"
            id="tags"
            placeholder="Enter comma separated tags"
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <Button className="w-[200px]" onClick={handleCreateBlog}>
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <span>Create Blog</span>
            )}
          </Button>
        </div>
      </div>
      <Toaster />
    </Section>
  )
}

export default CreateBlog