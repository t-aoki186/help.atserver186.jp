import { redirect } from '@sveltejs/kit';

export function load() {
  throw redirect(302, 'https://atserver186.jp/site/links');
}