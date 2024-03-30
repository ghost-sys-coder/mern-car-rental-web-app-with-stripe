import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "@/constants";
import { IBlogData } from "types";
import { formatDate } from "@/utils/methods";
import { Button } from "@/components/ui/button";
import { BlogGrid, CommentForm, EditBlog, Newsletter, RecentPosts, SocialLinks, UserProfileCard } from "@/components";
import { BlogPageSkeleton } from "@/skeletons";
import { useAuthContext } from "@/context/AuthContext";


const SingleBlog = () => {
  const { userProfile } = useAuthContext();
  const [article, setArticle] = useState<IBlogData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  /** fetch single blog post */
  useEffect(() => {
    const fetchSingleBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/blogs/${id}`);
        setArticle(data)
      } catch (error) {
        let message = "There was an un expected error!"
        if (axios.isAxiosError(error) && error.response) {
          message = error.response?.data.message || "Operation Failed"
        } else if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message, toastError);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id])


  return (
    <div className="blog-page">
      {loading ? (
        <BlogPageSkeleton />
      ) : (
        <>
          <div className="blog_header">
            <img
              src={article?.image}
              alt={article?.title}
            />
            <div className="content">
              <h1>{article?.title}</h1>
              <p className="font-semibold text-gray-200">{formatDate(article?.createdAt || "")}</p>
              <div className="h-1 w-1 bg-gray-500 rounded-full" />
              <p className="text-white font-bold">{article?.comments?.length} COMMENTS</p>
            </div>
          </div>
            {userProfile._id === article?.creator._id && (
              <EditBlog
                article={article}
              />
          )}
          <div className="container">
            <div className="left">
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: article?.description || "" }}
              />
              <div className="flex gap-3 items-center justify-start my-4 flex-wrap">
                {article?.tags.map((tag) => (
                  tag.split(",").map((item, index) => (
                    <Button
                      variant={"ghost"}
                      className="border-2 border-gray-500 rounded-2xl font-semibold text-n-3 hover:bg-primary hover:text-white hover:border-none w-[100px]"
                      key={index}>
                      #{item}
                    </Button>
                  ))
                ))}
              </div>

              {article && <UserProfileCard creator={article.creator} />}

              <BlogGrid />
              <CommentForm
                id={id}
              />
            </div>
            <div className="right">
              <div className="container">
                <div className="newsletter">
                  <Newsletter />
                </div>
                <RecentPosts />
                <SocialLinks />
              </div>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </div>
  )
}

export default SingleBlog