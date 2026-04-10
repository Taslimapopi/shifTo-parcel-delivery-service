import React from "react";
import Banner from "../banner/Banner";
import Workflow from "../workflow/WorkFlow";
import TopBrands from "../topBrands/TopBrands";
import Reviews from "../reviews/Reviews";
import FAQSection from "../faqs/Faqs";
import AddReview from "../addReview/AddReview";
import Newsletter from "../Newsletter/Newsletter";

const reviewPromise = fetch("/review.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="space-y-4">
      <Banner></Banner>
      <TopBrands></TopBrands>
      <Workflow></Workflow>
    
      <Reviews reviewPromise={reviewPromise}></Reviews>
      <AddReview></AddReview>
      <Newsletter></Newsletter>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
