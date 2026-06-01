import Navbar from "../sections/home/Navbar";
import Hero from "../sections/home/Hero";
import Services from "../sections/home/Services";
import Products from "../sections/home/Products";
import Phase from "../sections/home/Phase";
import Testumonials from "../sections/home/Testimonials";
import Social from "../sections/home/Social";
import Partners from "../sections/home/Partners";
import Contact from "../sections/home/Contact";
import Footer from "../sections/home/Footer";
import About from "../sections/home/About";
export default function Home() {
    return (
        <div className="mx-auto max-w-[1554px] bg-background-primary overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Products />
            <Phase />
            <Testumonials />
            
            <Social />
            <Partners />
           
            <Contact />
            
            <Footer />
        </div>
    )
}