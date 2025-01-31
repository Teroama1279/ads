"use client";
import { siteConfig } from "@/configs/site";
import React, { useEffect } from "react";
import MainNav from "@/components/navigation/main-nav";

const SiteHeader = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.setAttribute("data-cfasync", "false");
    script.innerHTML = `
      /*<![CDATA[/* */
      (function(){
        var u=window,t="c2558032fd6c75a989091d04a363dcf9",d=[["siteId",612+833-902-961+5066071],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],j=["d3d3LmludGVsbGlpb3B1cC5jb20vaHVuaXRlZ2FsbGVyeS5taW4uY3Nz","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvZ2d3V2cveWpxdWVyeS5lbmRsZXNzLXNjcm9sbC5taW4uanM="],o=-1,e,q,h=function(){
          clearTimeout(q);
          o++;
          if(j[o]&&!(1764233013000<(new Date).getTime()&&1<o)){
            e=u.document.createElement("script");
            e.type="text/javascript";
            e.async=!0;
            var n=u.document.getElementsByTagName("script")[0];
            e.src="https://"+atob(j[o]);
            e.crossOrigin="anonymous";
            e.onerror=h;
            e.onload=function(){
              clearTimeout(q);
              u[t.slice(0,16)+t.slice(0,16)]||h()
            };
            q=setTimeout(h,5E3);
            n.parentNode.insertBefore(e,n)
          }
        };
        if(!u[t]){
          try{
            Object.freeze(u[t]=d)
          }catch(e){}
          h()
        }
      })();
      /*]]>/* */
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <MainNav items={siteConfig.mainNav} />
    </header>
  );
};

export default SiteHeader;
