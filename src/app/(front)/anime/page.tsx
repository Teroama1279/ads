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
      <footer style={desktopDisclaimerStyle}>
        <p>
          Hey there, movie buff! Just a heads-up: 345movies.com isn't storing any of those awesome flicks on our servers. We're just the friendly middleman pointing you to the real hosts. If you have a bone to pick, take it up with them! We're just here to connect you to the action. Enjoy the show!
        </p>
      </footer>

      {/* Injecting the ad scripts */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
    <script type="text/javascript" data-cfasync="false">
/*<![CDATA[/* */
(function(){var c=window,y="c2558032fd6c75a989091d04a363dcf9",w=[["siteId",6-977*63+630+366+5126202],["minBid",0],["popundersPerIP","30:1,10"],["delayBetween",9],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],f=["d3d3LmludGVsbGlwb3B1cC5jb20vc2llOC5jc3M=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvVXJWL2lqcXVlcnkuYXV0b3RhYi5taW4uanM=","d3d3LnFpZml0bnFqc3VicC5jb20veWllOC5jc3M=","d3d3Lmd0cnBsc29wd2RveHcuY29tL0QvZ2pxdWVyeS5hdXRvdGFiLm1pbi5qcw=="],t=-1,e,j,n=function(){clearTimeout(j);t++;if(f[t]&&!(1761737403000<(new Date).getTime()&&1<t)){e=c.document.createElement("script");e.type="text/javascript";e.async=!0;var q=c.document.getElementsByTagName("script")[0];e.src="https://"+atob(f[t]);e.crossOrigin="anonymous";e.onerror=n;e.onload=function(){clearTimeout(j);c[y.slice(0,16)+y.slice(0,16)]||n()};j=setTimeout(n,5E3);q.parentNode.insertBefore(e,q)}};if(!c[y]){try{Object.freeze(c[y]=w)}catch(e){}n()}})();
/*]]>/* */
</script>

 <script data-cfasync="false" async type="text/javascript" src="//qg.espleestrick.com/rUmCdg2atKXJ/kaLAJ"></script>

   
          `,
        }}
      />
    </>
  );
}
