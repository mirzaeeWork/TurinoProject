import HeadManager from "@/components/element/HeadManager";
import ContactTourinoPage from "@/components/template/ContactTourinoPage";
import React from "react";

function ContactUs() {
  return (
    <>
      <HeadManager
        title="تماس با ما | تورینو"
        description="راه‌های ارتباط با آژانس تورینو"
      />
      <ContactTourinoPage />
    </>
  );
}

export default ContactUs;
