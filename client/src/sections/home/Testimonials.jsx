import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Button from "../../componenst/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="bg-backdrop-secondary box-border flex w-full min-w-0 flex-col py-20 min-h-screen px-10 md:px-16 lg:px-24 xl:px-32">
            <div className="h-[540px] w-full relative gap-10 flex flex-col">

                <div className="w-full h-full absolute top-0 left-0">
                <div className="w-full h-full  relative">
                    <div className="absolute bottom-0 right-0">
                    <FaQuoteRight className="w-29 h-25 text-quote-primary" />
                    </div>
                    <div className="absolute top-0 left-0">
                    <FaQuoteLeft className="w-29 h-25 text-quote-primary" />
                    </div>

                </div>
                </div>


                <div className="flex w-full justify-end items-center ">

                    <div className="flex gap-2">

                    <Button variant="icon" icon={<ChevronLeftIcon/>} />
                    <Button variant="icon" icon={<ChevronRightIcon/>} />
                    </div>

                </div>

                <div className="w-full h-full  flex items-center justify-center">

                    <div className="max-w-4xl mx-auto flex flex-col gap-2 ">
                        <p className="text-2xl font-light text-text-testimonials-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <label className="text-2xl font-medium text-text-testimonials-primary">Matheus Silva</label>
                    </div>

                </div>
            </div>
        </section>
    )
}