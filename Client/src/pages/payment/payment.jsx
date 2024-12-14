import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSelector } from "react-redux";

export default function App({ price }) {
  const { user } = useSelector((state) => state.auth);
  console.log(user, "user data");
  const config = {
    public_key: "FLWPUBK_TEST-697ed17ef025da489e6a41bdf4ecaa84-X",
    tx_ref: Date.now(),
    amount: price,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "john doe",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen bg-gray-100 ">
      <h1>
        Hello{" "}
        <span className="text-yellow-600 font-extrabold text-2xl">
          {user?.userName}
        </span>
        , Thanks for purchasing from Spark Haven
      </h1>
      <h1 className="my-4">Click button to proceed to payment</h1>
      <button
        className="rounded px-6 py-4  bg-white text-[#080B28] font-body text-lg font-extrabold hover:text-black transition ease-in duration-300 hover:bg-gradient-to-r from-yellow-400 to-white/5 focus:outline-none ring ring-yellow-300 hover:ring-0"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Make Payment
      </button>
    </div>
  );
}
