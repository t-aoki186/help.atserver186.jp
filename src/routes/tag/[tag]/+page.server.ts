import { getAllPosts } from '$lib/posts';
import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { tag: string } }) {
  const allPosts = await getAllPosts();

  const tag = params.tag.trim().toLowerCase();
  const filteredPosts = allPosts.filter(post =>
    post.tags
      .map((item) => item.toLowerCase())
      .includes(tag)
  );

  if (filteredPosts.length === 0) {
    throw error(404, `タグ「${params.tag}」の記事は見つかりませんでした`);
  }

  return { 
    tag: params.tag,
    posts: filteredPosts 
  };
}
