import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react";
import { IBlogData } from "types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const EditBlog = (
    { article }:
        {
            article: IBlogData,
        }
) => {
    return (
        <Dialog>
            <DialogTrigger className="mt-4 p-2 w-full flex justify-center items-center">
                <Edit />
                <span>Edit your blog</span>
            </DialogTrigger>
            <DialogContent className="min-h-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit This Blog</DialogTitle>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="title">Edit blog title</Label>
                            <Input
                                id="title"
                                defaultValue={article.title}
                                onChange={(e)=> article.title = e.target.value}
                            />
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}


export default EditBlog;