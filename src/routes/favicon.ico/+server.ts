import type { RequestHandler } from '@sveltejs/kit';
import favicon from '$lib/assets/favicon.png';

export const GET: RequestHandler = () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: favicon
    }
  });
};

export const HEAD: RequestHandler = () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: favicon
    }
  });
};
