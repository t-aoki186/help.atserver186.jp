import { getAllPosts } from '$lib/posts';
import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { category: string } }) {
  const allPosts = await getAllPosts();

  const filteredPosts = allPosts.filter(post => post.category === params.category);

  if (filteredPosts.length === 0) {
    throw error(404, `カテゴリ「${params.category}」の記事は見つかりませんでした`);
  }

  return { 
    category: params.category,
    posts: filteredPosts 
  };
}
