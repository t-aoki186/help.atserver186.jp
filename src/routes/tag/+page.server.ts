import { getAllPosts } from '$lib/posts';

export async function load() {
  const posts = await getAllPosts();

  // ユニークなタグを取得し、タグごとの記事数をカウント
  const tagMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  // タグを配列に変換してソート
  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return { tags };
}