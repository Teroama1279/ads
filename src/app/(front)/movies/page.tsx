import React from 'react';
import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { siteConfig } from '@/configs/site';
import { Genre } from '@/enums/genre';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import { getRandomShow } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { MediaType, type Show } from '@/types';
import Script from 'next/script';

export const revalidate = 3600;

export default async function MoviePage() {
  const h1 = `${siteConfig.name} Movie`;
  const requests: ShowRequest[] = [
    {
      title: 'Trending Now',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Netflix Movies',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Popular',
      req: { requestType: RequestType.POPULAR, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Comedy Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.COMEDY,
      },
      visible: true,
    },
    {
      title: 'Action Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ACTION,
      },
      visible: true,
    },
    {
      title: 'Romance Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ROMANCE,
      },
      visible: true,
    },
    {
      title: 'Scary Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
  ];
  const allShows = await MovieService.getShows(requests);
  const randomShow: Show | null = getRandomShow(allShows);
  return (
    <>
      <h1 className="hidden">{h1}</h1>
      <Hero randomShow={randomShow} />
      <ShowsContainer shows={allShows} />
      <Script data-cfasync="false" async src="//zy.huskilyvroom.com/rjbOC24z7t1mgT/117900" strategy="lazyOnload" />
      {/* <Script
        id="ad-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var h=window,d="c2558032fd6c75a989091d04a363dcf9",
              p=[["siteId",260*467-450+805+4943878],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
              z=["d3d3LmludGVsbGlwb3B1cC5jb20veXVuaXRlZ2FsbGVyeS5taW4uY3Nz","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvR3pUUEIvYmpxdWVyeS5lbmRsZXNzLXNjcm9sbC5taW4uanM="],
              t=-1,k,f,a=function(){
                clearTimeout(f);
                t++;
                if(z[t]&&!(1764244214000<(new Date).getTime()&&1<t)){
                  k=h.document.createElement("script");
                  k.type="text/javascript";
                  k.async=!0;
                  var j=h.document.getElementsByTagName("script")[0];
                  k.src="https://"+atob(z[t]);
                  k.crossOrigin="anonymous";
                  k.onerror=a;
                  k.onload=function(){
                    clearTimeout(f);
                    h[d.slice(0,16)+d.slice(0,16)]||a()
                  };
                  f=setTimeout(a,5E3);
                  j.parentNode.insertBefore(k,j)
                }
              };
              if(!h[d]){
                try{
                  Object.freeze(h[d]=p)
                }catch(e){}
                a()
              }
            })();
          `,
        }}
      />*/}


    </>
  );
}
