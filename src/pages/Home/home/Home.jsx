import React from "react";
import Banner from "../banner/Banner";
import Workflow from "../workflow/WorkFlow";
import TopBrands from "../topBrands/TopBrands";
import Reviews from "../reviews/Reviews";
import FAQSection from "../faqs/Faqs";

const reviewPromise = fetch("/review.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="space-y-4">
      <Banner></Banner>
      <Workflow></Workflow>
      <TopBrands></TopBrands>

      <Reviews reviewPromise={reviewPromise}></Reviews>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
