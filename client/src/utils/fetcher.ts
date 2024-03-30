import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { toastError } from "@/constants";

interface ApiResponse<T> {
    data: T[] | null;
    loading: boolean;
}

const useFetchData = <T>(url: string): ApiResponse<T> => {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const response: AxiosResponse<T[]> = await axios.get(url);
                setData(response.data);
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

        fetchData();

    }, [url]);

    return { data, loading }
}


export default useFetchData;