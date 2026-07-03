import { getAllPosts } from '$lib/posts';
import type { Post } from '$lib/types';

export async function load() {
  const posts = await getAllPosts();
  return { posts };
}