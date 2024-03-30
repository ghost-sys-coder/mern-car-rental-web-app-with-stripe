import { Dispatch, SetStateAction, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Edit2, Loader2 } from "lucide-react";
import { IComment } from "types";
import { Textarea } from "../ui/textarea";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/constants";


const EditComment = (
    { details, fetchBlogComments, id, setDetails, creator }: {
        details: IComment;
        fetchBlogComments: () => void;
        id: string;
        setDetails: Dispatch<SetStateAction<IComment>>,
        creator: string;
    }) => {
    const [isEdittingComment, setIsEdittingComment] = useState<boolean>(false);

    /** edit comment */
    const handleEditComment = async () => {
        setIsEdittingComment(true);

        try {
            const { data, status } = await axios.put(`/blogs/${id}/comments/${creator}`, {
                details
            });
            toast.success(data.message, toastSuccess);   
            setDetails({
                creator: creator,
                name: "",
                email: "",
                description: ""
            })
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
            setIsEdittingComment(false);
        }
    } 
    return (
        <Dialog>
            <DialogTrigger asChild>
                    <Edit2
                        size={30}
                        className="font-bold text-primary cursor-pointer border border-primary p-1 rounded-md"
                    />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit your comment</DialogTitle>
                    <DialogDescription>
                        Make changes to your comment
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue={details.name}
                            onChange={(e)=> details.name = e.target.value}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="email" className="text-left">Email</Label>
                        <Input
                            id="email"
                            defaultValue={details.email}
                            onChange={(e)=> details.email = e.target.value}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="description" className="text-left">Comment</Label>
                        <Textarea
                            id="description"
                            defaultValue={details.description}
                            onChange={e => details.description = e.target.value}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        className="flex gap-2 justify-center items-center"
                        onClick={handleEditComment}
                        type="submit">
                        {isEdittingComment ? (
                            <>
                                <Loader2 className="animate-spin" />
                                <span>Saving changes...</span>
                            </>
                        ): (
                            <span>Save Changes</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditComment