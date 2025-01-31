"use client";
import { siteConfig } from "@/configs/site";
import React, { useEffect } from "react";
import MainNav from "@/components/navigation/main-nav";

const SiteHeader = () => {
 

  return (
    <header className="sticky top-0 z-50">
      <MainNav items={siteConfig.mainNav} />
    </header>
  );
};

export default SiteHeader;
