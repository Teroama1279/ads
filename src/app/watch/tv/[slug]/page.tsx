'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const id = params.slug.split('-').pop();
  const newUrl = `https://456movie.com/tv/watch/${id}`;

  useEffect(() => {
    // Redirect to the new URL
    router.push(newUrl);
  }, [newUrl, router]);

  return <div>Redirecting...</div>; // Show a message while redirecting
}
