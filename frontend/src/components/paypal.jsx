import React, { useEffect, useRef } from "react";

const Paypal = () => {
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (date, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Necklace",
                            amount: {
                                currency_code: "PLN",
                                value: 400.00
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log("Order complete" + order)
            },
        }).render(paypal.current)
    }, [])
    
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
} 

export default Paypal