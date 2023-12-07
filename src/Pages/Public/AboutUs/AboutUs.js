import React from "react";
import "./AboutUs.css";
import Story from "./Story/Story";
import Laicence from "./Laicence/Laicence";
import PaymentMethod from "./PaymentMethod/PaymentMethod";

const AboutUs = () => {
  return (
    <section className="container">
      <Story />
      <Laicence />
      <PaymentMethod />
    </section>
  );
};

export default AboutUs;
