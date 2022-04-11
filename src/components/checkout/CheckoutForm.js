import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./CheckoutForm.css";
import ResetButton from "./ResetButton";
import Field from "./Field";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

const CardField = ({ onChange }) =>
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>;

function CheckoutForm({ totalCost }) {
  //   const [status, setStatus] = useState("default");
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: ""
  });

  if (error) {
    elements.getElement("card").focus();
    return;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    });
    setProcessing(false);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: totalCost * 100,
          id
        });
        if (response.data.success) {
          console.log("Successful payment");
          setPaymentMethod(paymentMethod);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (err) {
        console.log("Error", err);
        setError("Payment not successful!");
      }
    } else {
      console.log(error.message);
      setError("Error Occured with the payment");
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: ""
    });
  };

  return paymentMethod
    ? <div className="Result">
        <div className="ResultTitle" role="alert">
          Payment successful
        </div>
        <div className="ResultMessage">
          Thanks for trying Stripe Elements. Payment with an id:
          {paymentMethod.id} was generated
        </div>
        <ResetButton onClick={reset} />
      </div>
    : <form className="Form" onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <Field
            label="Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={billingDetails.name}
            onChange={e => {
              setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
          />
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            autoComplete="email"
            value={billingDetails.email}
            onChange={e => {
              setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
          />
          <Field
            label="Phone"
            id="phone"
            type="tel"
            placeholder="(941) 555-0123"
            required
            autoComplete="tel"
            value={billingDetails.phone}
            onChange={e => {
              setBillingDetails({ ...billingDetails, phone: e.target.value });
            }}
          />
        </fieldset>
        <fieldset className="FormGroup">
          <CardField
            onChange={e => {
              setError(e.error);
              setCardComplete(e.complete);
            }}
          />
        </fieldset>
        {error &&
          <ErrorMessage>
            {error.message}
          </ErrorMessage>}
        <SubmitButton processing={processing} error={error} disabled={!stripe}>
          Pay ${totalCost}
        </SubmitButton>
      </form>;
}

export default CheckoutForm;
