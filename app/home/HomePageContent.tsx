import React from "react";
import dynamic from "next/dynamic";
import MarketingLayout from "@/components/MarketingLayout";
import HomeHero from "./components/HomeHero";

const HomeLogos = dynamic(() => import("./components/HomeLogos"));
const HomeCapabilities = dynamic(() => import("./components/HomeCapabilities"));
const HomeStats = dynamic(() => import("./components/HomeStats"));
const HomeModuleTabs = dynamic(() => import("./components/HomeModuleTabs"));
const HomeMACH = dynamic(() => import("./components/HomeMACH"));
const HomeAudiences = dynamic(() => import("./components/HomeAudiences"));
const HomeFAQ = dynamic(() => import("./components/HomeFAQ"));

export default function HomePageContent() {
  return (
    <MarketingLayout mainClassName="quote-engine-page home-landing home-page">
      <HomeHero />
      <HomeLogos />
      <HomeCapabilities purple />
      <HomeStats />
      <HomeModuleTabs />
      <HomeMACH />
      <HomeAudiences />
      <HomeFAQ purple />
    </MarketingLayout>
  );
}
