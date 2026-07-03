import { getAllPosts } from '$lib/posts';

export async function load() {
  const posts = await getAllPosts();

  // ユニークなカテゴリを取得し、カテゴリごとの記事数をカウント
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  // カテゴリを配列に変換してソート
  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return { categories };
}