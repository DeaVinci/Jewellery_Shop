import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser"

const Paypal = ({ amount, userData, token, navigate }) => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const paypal = useRef();

  useEffect(() => {
    if (!paypalLoaded && !window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=PLN`;
      script.addEventListener("load", () => {
        setPaypalLoaded(true);
        initializePayPal();
      });
      document.body.appendChild(script);
    } else if (!paypalLoaded && window.paypal) {
      setPaypalLoaded(true);
      initializePayPal();
    }
  }, [paypalLoaded]);

  const initializePayPal = () => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: "PLN",
              value: amount.toFixed(2)
            },
            shipping: {
              name: {
                full_name: `${userData.first_name} ${userData.last_name}`
              },
              address: {
                address_line_1: userData.street,
                address_line_2: userData.houseNumber,
                admin_area_2: userData.city,
                postal_code: userData.zipCode,
                country_code: "PL"
              }
            }
          }],
          payer: {
            name: {
              given_name: userData.first_name,
              surname: userData.last_name
            },
            email_address: userData.email,
            phone: {
              phone_type: "MOBILE",
              phone_number: {
                national_number: userData.phone
              }
            },
            address: {
              address_line_1: userData.street,
              address_line_2: userData.houseNumber,
              admin_area_2: userData.city,
              postal_code: userData.zipCode,
              country_code: "PL"
            }
          }
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log("Order complete:", order);
        alert(`Transaction completed by ${order.payer.name.given_name}`);
        
        // Send order data to your backend
        const orderItems = JSON.parse(localStorage.getItem('orderItems'));
        const orderData = {
          ...userData,
          subtotal: amount,
          products_ids: orderItems.map(item => ({ name: item.name, quantity: item.quantity }))
        };
        
        try {
          const response = await axios.post(`http://${process.env.REACT_APP_BACKEND}/bizuteria/order`, orderData, {
            headers: {
              token: token
            }
          });
          const postData = response.data
          console.log('Order placed:', postData.data);
          localStorage.removeItem('orderItems');
          navigate('/cart/order/orderdone');
          
          // Send confirmation email
          sendConfirmationEmail(orderData, order, postData);
        } catch (error) {
          console.error('Order placement failed', error);

          if (error.response) {
            console.error('Server responded with:', error.response.data);
          } else if (error.request) {
            console.error('Request was not sent:', error.request);
          } else {
            console.error('Error during request processing:', error.message);
          }
        }
      },
      onError: err => {
        console.error("Error:", err);
        alert("An error occurred during the transaction.");
      }
    }).render(paypal.current);
  };

  const sendConfirmationEmail = (orderData, order, postData) => {
    const templateParams = {
      user_email: userData.email,
      user_name: `${userData.first_name} ${userData.last_name}`,
      order_id: postData.id,
      order_total: order.purchase_units[0].amount.value,
      order_products: orderData.products_ids.map(p => `Produkt: ${p.name} (Ilość: ${p.quantity})`).join('\n'),
      order_date: new Date().toLocaleString(),
      user_city: userData.city,
      user_zip_code: userData.zipCode,
      user_street: userData.street,
      user_house_number: userData.houseNumber
    };

    emailjs.send('service_yog1wxb', 'template_yowliza', templateParams, 'Gz403oXSb50Yj0X3a')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return <div ref={paypal}></div>;
};

export default Paypal;
