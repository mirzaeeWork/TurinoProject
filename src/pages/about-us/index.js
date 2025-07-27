import HeadManager from "@/components/element/HeadManager";
import AboutTourinoPage from "@/components/template/AboutTourinoPage";
import React from "react";

function AboutUs() {
  return (
    <>
      <HeadManager
        title="درباره ما | تورینو"
        description="آشنایی با آژانس تورینو"
      />
      <AboutTourinoPage />
    </>
  );
}

export default AboutUs;
