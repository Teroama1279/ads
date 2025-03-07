import { redirect } from 'next/navigation';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const tmdbID = params.slug.split('-').pop();
  const newUrl = `https://456movie.net/movie/watch/${tmdbID}`;

  // Server-side redirect
  redirect(newUrl);

  return null; // Nothing is rendered since we're redirecting
}
