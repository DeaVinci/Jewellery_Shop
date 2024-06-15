import React from "react";
import { Link } from "react-router-dom";
import { ListComponent } from "../components/templates";

const AfterOrderPage = () => {

    return(
        <div className="justify-center flex my-32 font_poppins ">
            <div className="w-8/12 shadow-2xl drop-shadow rounded-md flex flex-col items-center gap-3 text-xl p-5">
            <h1 className="text-bold">Dziękujemy za Twoje zamówienie!</h1>
            <h1 className="text-bold">Potwierdzenie zamówienia zostało wysłane na Twój adres email</h1>
            <ListComponent>
                <Link to='/'>Powrót na stronę główną</Link>
            </ListComponent>
            </div>
        </div>
    )
}

export default AfterOrderPage