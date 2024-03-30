import { Car, Heart, Smile } from "lucide-react"
import Section from "./Section"

const ChooseUs = () => {
    return (
        <Section classes="min-h-screen bg-primary flex flex-col items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
                <h2 className="text-xl sm:text-3xl font-semibold text-white">Why Choose Us</h2>
                <p className="font-semibold text-gray-300">Explore our first rental car collection</p>
            </div>
            <div className="choose">
                <div className="container">
                    <div className="icons">
                        <Car size={50} />
                    </div>
                    <div className="content">
                    <h3>Variety of car brands</h3>
                    <p>Check out our wide variety of cars that we provide for your comfort</p>
                    </div>
                </div>
                <div className="container">
                    <div className="icons">
                        <Smile size={50} />
                    </div>
                    <div className="content">
                    <h3>Best Rate Guarantee</h3>
                    <p>With the quality of service that we offer, we couple that with the best rates around town for the best services offered!</p>
                    </div>
                </div>
                <div className="container">
                    <div className="icons">
                        <Heart size={50} />
                    </div>
                    <div className="content">
                    <h3>Awesome Customer Support</h3>
                    <p>We offer 24/7 customer support!</p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default ChooseUs