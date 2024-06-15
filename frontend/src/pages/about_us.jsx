import React from "react";
import { OrderLabel } from "../components/templates";


const AboutUs = () => {
    return (
        <div class="hero my-32 font_poppins">
            <div class="hero-content text-center w-8/12 shadow-2xl border-2 rounded-md">
                <div class="w-10/12 items-center justify-center flex flex-col">
                    <h1 class="text-5xl font-bold">Poznaj nas</h1>
                    <p class="py-6">Jesteśmy rodzinną firmą zajmującą się niemal 40 lat wyrobem i sprzedażą ręcznie wytwarzanej biżuterii. Jesteśmy również oficjalnym dystrybutorem kilku marek luksusowych zegarków, które znajdziecie Państwo w naszej ofercie.
                    </p>
                    <p class="py-6">Za radą lokalnych klientów i po własnych analizach otwieramy się w Internecie z nadzieją, że nasze wyroby przyniosą uśmiech na twarze jeszcze większej liczby klientów.
                    </p>
                    <p class="font-bold py-6">Dziękujemy za zaufanie
                    </p>
                    <form className="w-full shadow-2xl drop-shadow rounded-md flex flex-col items-center p-2 m-5">
                    <h1 class="text-2xl font-bold">Skontaktuj się z nami</h1>
                    <OrderLabel>
                        Email:
                        <label className="flex w-32 md:w-48 lg:w-64 items-center text-center justify-center rounded-lg border">
                            zlotysklepik@sklep.pl
                        </label>
                    </OrderLabel>
                    <OrderLabel>
                        Telefon:
                        <label className="flex w-32 md:w-48 lg:w-64 items-center text-center justify-center rounded-lg border">
                            123123123
                        </label>
                    </OrderLabel>
                </form>
            </div>
        </div>
        </div >
    )
}

export default AboutUs