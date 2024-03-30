import { ToastPosition } from "react-hot-toast";

export const toastError = {
  duration: 4000,
  position: "top-right" as ToastPosition | undefined,
  style: {
    backgroundColor: "red",
    color: "#fff",
    padding: "10px 15px",
    marginTop: "2rem",
  },
};

export const toastSuccess = {
  duration: 4000,
  position: "top-right" as ToastPosition | undefined,
  style: {
    color: "#fff",
    padding: "10px 15px",
    marginTop: "2rem",
  },
  className: "bg-primary",
};

/** react-quill text editor modifications */
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const navLinks = [
  { id: "1", linkText: "Home", linkUrl: "/" },
  {
    id: "2",
    linkText: "Cars",
    dropLinks: [
      { id: 1, linkText: "Toyota", linkUrl: "/toyota" },
      { id: 2, linkText: "Mercendez", linkUrl: "/mercendez" },
      { id: 3, linkText: "BMW", linkUrl: "/bmw" },
    ],
  },
  { id: "3", linkText: "Booking", linkUrl: "/booking" },
  { id: "4", linkText: "Blog", linkUrl: "/blog" },
  { id: "5", linkText: "Shop", linkUrl: "/shop" },
];
