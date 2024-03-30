import { ReactNode } from "react";

interface ISection {
    image?: string;
    title?: string;
    text?: string;
    children: ReactNode,
    classes?: string
}

const Section = ({ image, children, classes }: ISection) => {
    return (
        <section className={`w-full relative ${image} bg-no-repeat bg-cover bg-center py-10 sm:py-20 px-4 sm:px-10 ${classes}`}>
            {children}
        </section>
    )
}

export default Section