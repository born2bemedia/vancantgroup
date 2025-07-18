import RequestBlock from "@/src/app/[locale]/_global-components/LayoutElements/RequestBlock";
import "@/public/scss/contact.scss";
import React from "react";
import ContactUsHero from "./_components/ContactUsHero";
import { Link } from "@/src/navigation";
import Facebook from "@/src/app/[locale]/_global-components/LayoutElements/socials/Facebook";
import Instagram from "@/src/app/[locale]/_global-components/LayoutElements/socials/Instagram";
import Twitter from "@/src/app/[locale]/_global-components/LayoutElements/socials/Twitter";
import LinkedIn from "@/src/app/[locale]/_global-components/LayoutElements/socials/LinkedIn";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact a marketing expert to find a solution for any marketing challenge. The Vancant Group team will consult you on possible solutions from branding to compliance.",
  openGraph: {
    title: "Contact Us",
    description:
      "Contact a marketing expert to find a solution for any marketing challenge. The Vancant Group team will consult you on possible solutions from branding to compliance.",
    images: "https://vancantgroup.com/images/meta.png",
  },
};

function ContactUsPage() {
  const t = useTranslations("ContactUs");

  return (
    <>
      <ContactUsHero
        title={t("title")}
        subtitle={t("subtitle")}
        text={t.rich("text", {
          br: () => <br />,
        })}
        submit={t("submit")}
      />
      <RequestBlock
        title={t("requestBlockTitle")}
        buttonText={t("requestButtonText")}
      />
      <div className="contact-socials">
        <Facebook />
        <Instagram />
        <Twitter />
        <LinkedIn />
      </div>
    </>
  );
}

export default ContactUsPage;
