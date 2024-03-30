import { BlogArticles, CallUsSection, CarGrid, CarsToggle, ChooseUs, Hero } from "@/components"


const Home = () => {
  return (
    <div className="home">
      <Hero />
      <CarGrid />
      <CarsToggle />
      <CallUsSection />
      <ChooseUs />
      <BlogArticles />
    </div>
  )
}

export default Home