import { Dispatch, SetStateAction, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "@/constants";
import { IBlogProps } from "types";

interface DescriptionProps {
  setDetails: Dispatch<SetStateAction<IBlogProps>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>
}

const BlogDescription = ({setDetails, value, setValue}: DescriptionProps) => {
  

  useEffect(() => {
    setDetails((prevData) => ({
      ...prevData,
      description: value
    }))
  }, [setDetails, value])

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      placeholder="Write your article..."
      className="text-n-3 font-poppins"
    />
  )
}

export default BlogDescription