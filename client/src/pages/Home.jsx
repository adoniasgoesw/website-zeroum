
import Service from "../sections/home/Service";
import Products from "../sections/home/Products";
import Phase from "../sections/home/Phase";
import About from "../sections/home/About";
import Testimonials from "../sections/home/Testimonials";
import Galery from "../sections/home/Galery";
import Company from "../sections/home/Company";


export default function Home() {
    return (
        <div className="max-w-[1554px] mx-auto bg-backdrop-primary">
            <About />
            <Service />
            <Products />
            <Phase />
            <Testimonials />
            <Galery />
            
            <Company />
        </div>
    )
}