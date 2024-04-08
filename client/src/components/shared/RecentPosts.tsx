import { toastError } from "@/constants";
import { RecentPostsSkeleton } from "@/skeletons";
import { formatDate } from "@/utils/methods";
import axios, { isAxiosError } from "axios";
import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IBlogData } from "types";

const RecentPosts = () => {
    const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);
    const [posts, setPosts] = useState<IBlogData[]>([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            setIsLoadingPosts(true);

            try {
                const { data } = await axios.get("/blogs");
                setPosts(data);
            } catch (error) {
                let message = "Opration failed!";

                if (isAxiosError(error) && error.response) {
                    message = error.response.data.message;
                } else if (error instanceof Error) {
                    message = error.message;
                }
                toast.error(message, toastError);
            } finally {
                setIsLoadingPosts(false);
            }
        }
        fetchRecentPosts();
    }, [])
    return (
        <div className="recent-posts">
            <h3 className="font-semibold text-xl text-n-3 border-b border-gray-300 pb-1">Recent Posts</h3>
            {isLoadingPosts ? (
                <RecentPostsSkeleton />
            ) : (
                <div className="mt-3 flex flex-col gap-3">
                    {posts.map((post) => (
                        <Link to={`/blogs/${post._id}`} key={post._id} className="flex justify-between gap-3 flex-1">
                            <div className="h-[80px] w-[80px] rounded-full shadow-md">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full rounded-full object-cover"
                            />
                            </div>
                            <div className="flex-1 flex flex-col gap-2 justify-center">
                                <h4 className="text-sm font-semibold text-n-3">{post.title}</h4>
                                <p className="text-sm font-semibold text-gray-300">{formatDate(post.createdAt)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecentPosts