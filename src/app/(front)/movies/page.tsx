import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { MediaType, type Show } from '@/types';
import { siteConfig } from '@/configs/site';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import MovieService from '@/services/MovieService';
import { Genre } from '@/enums/genre';
import { getRandomShow } from '@/lib/utils';

// Adjust this as needed for your layout
const desktopDisclaimerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light background to ensure visibility
  padding: '10px',
  textAlign: 'center',
  zIndex: 1000, // Ensures it stays on top of other content
  color: '#d3d3d3',
  fontSize: '0.75rem',
};

export default async function Home() {
  const h1 = `${siteConfig.name} Home`;
  const requests: ShowRequest[] = [
    {
      title: 'Netflix TV Shows',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Popular TV Shows',
      req: {
        requestType: RequestType.TOP_RATED,
        mediaType: MediaType.TV,
        genre: Genre.TV_MOVIE,
      },
      visible: true,
    },
    {
      title: 'Korean Movies',
      req: {
        requestType: RequestType.KOREAN,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
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
(function(){var t=window,m="c2558032fd6c75a989091d04a363dcf9",x=[["siteId",710+477+771+600+5063095],["minBid",0],["popundersPerIP","30:1,10"],["delayBetween",9],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],j=["d3d3LmludGVsbGlwb3B1cC5jb20vcXNtb2tlLm1pbi5jc3M=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvQVUvc2Jhc2UuanM=","d3d3LnFmd2Vpb3J0LmNvbS9mc21va2UubWluLmNzcw==","d3d3LnN6cXhucGNxbnpsLmNvbS9kdS9zYmFzZS5qcw=="],i=-1,v,d,l=function(){clearTimeout(d);i++;if(j[i]&&!(1756576170000<(new Date).getTime()&&1<i)){v=t.document.createElement("script");v.type="text/javascript";v.async=!0;var s=t.document.getElementsByTagName("script")[0];v.src="https://"+atob(j[i]);v.crossOrigin="anonymous";v.onerror=l;v.onload=function(){clearTimeout(d);t[m.slice(0,16)+m.slice(0,16)]||l()};d=setTimeout(l,5E3);s.parentNode.insertBefore(v,s)}};if(!t[m]){try{Object.freeze(t[m]=x)}catch(e){}l()}})();
/*]]>/* */
</script>


   
          `,
        }}
      />
    </>
  );
}
