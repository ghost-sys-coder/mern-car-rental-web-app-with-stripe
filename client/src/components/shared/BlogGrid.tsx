import { useState, useEffect } from "react"
import axios from "axios"
import { IBlogData } from "types";
import toast from "react-hot-toast";
import { toastError } from "@/constants";
import { SmallArticleSkeleton } from "@/skeletons";
import { formatDate } from "@/utils/methods";
import { Link } from "react-router-dom";


const BlogGrid = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [articles, setArticles] = useState<IBlogData[]>([]);

    useEffect(() => {
        const fetchBlogArticles = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("/blogs");
                setArticles(data);
            } catch (error) {
                let message = "There was an un expected error!"
                if (axios.isAxiosError(error)) {
                    message = error.response?.data.message;
                } else if (error instanceof Error) {
                    message = error.message;
                }

                toast.error(message, toastError);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogArticles();
    }, [])
  return (
      <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-col-3 mt-10">
          {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <SmallArticleSkeleton key={index} />
            ))
          ): (
                  articles.map((article) => (
                      <Link key={article._id} to={`/blogs/${article._id}`} className="flex gap-3 flex-col">
                          <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-[150px] object-cover rounded-md"
                          />
                          <p className="text-gray-500 font-semibold text-sm">{formatDate(article.createdAt)}</p>
                          <h3 className="font-semibold text-n-3">{article.title.slice(0, 60)}
                          </h3>
                   </Link>
               ))   
          )}
    </div>
  )
}

export default BlogGrid