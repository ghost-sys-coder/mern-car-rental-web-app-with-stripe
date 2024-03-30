import {
    ChangeEvent,
    FormEvent,
    useState,
    useCallback,
    useEffect,
} from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/constants";
import { Loader2, Trash2 } from "lucide-react";
import { UserCommentSkeleton } from "@/skeletons";
import { IComment } from "types";
import { useAuthContext } from "@/context/AuthContext";
import EditComment from "./EditComment";
import { Link } from "react-router-dom";

const CommentForm = ({ id }: { id: string }) => {
    const { userProfile, isUserAuthenticated } = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<IComment>({
        creator: userProfile._id,
        description: "",
        name: "",
        email: "",
    });
    const [comments, setComments] = useState<IComment[]>([]);
    const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false);
    const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);


    /** handle fetch comments */
    const fetchBlogComments = useCallback(async () => {
        setIsCommentsLoading(true);

        try {
            const { data } = await axios.get(`/blogs/${id}/comments`);
            setComments(data);
        } catch (error) {
            let message = "Operation Failed!";
            if (isAxiosError(error)) {
                message = error.response?.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            toast.error(message, toastError);
        } finally {
            setIsCommentsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchBlogComments();
    }, [fetchBlogComments]);

    /** handle input change */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /** handle form submit */
    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        /** validation */
        if (!details.description || !details.email || !details.name) {
            return toast.error("All fields are required!", toastError);
        }

        if (!details.creator) {
            return toast.error("Creator ID missing!", toastError)
        }

        setLoading(true);
        try {
            const { status } = await axios.post(`/blogs/${id}/comments`, {
                comments: details,
            });
            toast.success("Comment sent!", toastSuccess);
            setDetails({
                creator: userProfile._id,
                description: "",
                name: "",
                email: ""
            })
            if (status === 200) {
                fetchBlogComments();
            }
        } catch (error) {
            let message = "Operation Failed!";
            if (isAxiosError(error)) {
                message = error.response?.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            setTimeout(() => {
                if (message === "You can only comment once on a blog post!") {
                    setDetails({
                        creator: userProfile._id,
                        description: "",
                        name: "",
                        email: ""
                    })
                }
            }, 2000);
            toast.error(message, toastError);
        } finally {
            setLoading(false);
        }
    };

    /** handle edit comment */


    /** handle delete comment */
    const handleDeleteComment = async (id: string, creator: string) => {
        setIsDeletingComment(true);

        try {
            const { data, status } = await axios.delete(`/blogs/${id}/comments/${creator}`);
            toast.success(data.message, toastSuccess);
            if (status === 200) {
                fetchBlogComments();
            }
        } catch (error) {
            let message = "Operation";

            if (isAxiosError(error)) {
                message = error.response?.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            toast.error(message, toastError);
        } finally {
            setIsDeletingComment(false);
        }
    }

    return (
        <div className="flex gap-3 flex-col mt-10">
            <div className="border-b-2 border-gray-400">
                <h4 className="font-semibold text-n-3">Leave a reply</h4>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="flex flex-col gap-2">
                    <label className="text-n-3 font-medium" htmlFor="comment">
                        Comment
                    </label>
                    <Textarea
                        placeholder="Write your comment..."
                        id="description"
                        name="description"
                        value={details.description}
                        onChange={(e) =>
                            setDetails({ ...details, description: e.target.value })
                        }
                    />
                </div>
                <div className="flex flex-col sm:flex-col gap-3 mt-4">
                    <div className="flex flex-col gap-2 w-full sm:flex-1">
                        <label htmlFor="name">Name</label>
                        <Input
                            placeholder="Enter your name..."
                            value={details.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full sm:flex-1">
                        <label htmlFor="email">Email</label>
                        <Input
                            placeholder="Enter your email..."
                            id="email"
                            name="email"
                            value={details.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {isUserAuthenticated ? (
                    <Button
                        type="submit"
                        className="flex justify-center items-center gap-2 my-4 sm:w-1/3 w-full"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <span>Comment</span>
                        )}
                    </Button>
                ) : (
                    <Button className="my-3 w-full sm:w-1/3" asChild>
                        <Link to={"/login"}>
                            Login to Comment
                        </Link>
                    </Button>
                )}
            </form>
            {isCommentsLoading ? (
                <UserCommentSkeleton />
            ) : (
                <div className="flex gap-3 flex-col">

                    {comments.map((comment) => (
                        <div key={comment.creator} className="flex flex-col gap-2">
                            <h3 className="font-semibold text-n-3">{comment.name}</h3>

                            <p>{comment.description}</p>
                            {comment.creator === userProfile._id && (
                                <div className="flex gap-3 justify-end items-center py-2">
                                    <Trash2
                                        size={30}
                                        className={`font-bold text-red-900 cursor-pointer border border-primary p-1 rounded-md ${isDeletingComment ? "animate-spin" : ""}`}
                                        onClick={() => handleDeleteComment(id, comment.creator || "")}
                                    />
                                    <EditComment
                                        details={comment}
                                        fetchBlogComments={fetchBlogComments}
                                        id={id}
                                        setDetails={setDetails}
                                        creator={userProfile._id}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentForm;
