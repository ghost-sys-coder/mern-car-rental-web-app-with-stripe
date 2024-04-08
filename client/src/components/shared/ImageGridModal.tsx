import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { shimmer } from "@/skeletons";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGridModal = ({ images }: { images: string[] | undefined }) => {
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleSelectedImage = (imageUrl: string) => {
        setSelectedImage(imageUrl)
    }

    const handlePreviousImage = (images: string[]) => {
        const currentIndex = images.findIndex(img => img === selectedImage);
        const previousIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[previousIndex]);
    }
    
    const handleNextImage = (images: string[]) => {
        const currentIndex = images.findIndex(img => img === selectedImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
    }

    return (
        <div className="mt-10 grid gap-5 max-md:grid-cols-2 md:grid-cols-2 max-[400px]:grid-cols-1">
            {images?.map((image, index) => (
                <Dialog key={index}>
                    <DialogTrigger
                        className="w-full"
                        onClick={() => handleSelectedImage(image)}
                    >
                        <div className="h-[250px] rounded-md shadow-md overflow-hidden">
                            <img
                                src={image}
                                alt={image + "1"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <div className={`${shimmer} w-full h-[500px] bg-gray-200 relative`}>
                                <img
                                    src={selectedImage}
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                                <div className="flex justify-between items-center gap-10 absolute top-[50%] left-0 right-0 w-full">
                                    <ChevronLeft size={40} className="text-primary border border-gray-400 rounded-full bg-white cursor-pointer hover:bg-opacity-20"
                                    onClick={() => handlePreviousImage(images)} />
                                    <ChevronRight size={40} className="text-primary border border-gray-400 rounded-full bg-white cursor-pointer hover:bg-opacity-20"
                                    onClick={() => handleNextImage(images)} />
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    )
}

export default ImageGridModal