import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BlogArticleSkeleton } from "@/skeletons";
import Section from "./Section"
import { IBlogData } from "types";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/methods";
import { toastError } from "@/constants";

const BlogArticles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<IBlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get("/blogs");
        setArticles(data);
      } catch (error) {
        let message = "Operation Failed!"

        if (axios.isAxiosError(error)) {
          message = error.response?.data.message || "An un expected error occured!"
        } else if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message, toastError);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [])
  const handleNavigateTo = (url: string) => {
    navigate(`/blogs/${url}`)
  }
  return (
    <Section classes="min-h-screen">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h2 className="font-semibold sm:text-3xl text-xl text-n-3">Articles & Tips</h2>
        <p className="font-normal text-sm text-gray-400">Explore some of the best tips from us!</p>
      </div>
      {loading ? (
        <BlogArticleSkeleton />
      ) : (
        <div className="blog-articles">
          {articles.map((item) => (
            <Link to={`/blogs/${item._id}`} key={item._id} className="container">
              <div className="image">
                <img
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="content">
                <p>{formatDate(item.createdAt || "")}</p>
                <h3 className="font-semibold text-n-3 overflow-hidden whitespace-nowrap text-ellipsis">{item.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: item.description?.slice(0, 200) || "" }}
                  className="text-sm"
                />
                <Button onClick={() => handleNavigateTo(item._id)}>
                  Read More
                </Button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Section>
  )
}

export default BlogArticles