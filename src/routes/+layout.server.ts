import { getAllPosts } from '$lib/posts';

export async function load() {
	/* --- 記事一覧 --- */
	const posts = await getAllPosts();

	/*カテゴリ*/
	// ユニークなカテゴリを取得し、カテゴリごとの記事数をカウント
	const categoryMap = new Map<string, number>();

	posts.forEach((post) => {
		const count = categoryMap.get(post.category) || 0;
		categoryMap.set(post.category, count + 1);
	});

	// カテゴリを配列に変換してソート
	const categories = Array.from(categoryMap.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);

	/*タグ*/
	// ユニークなタグを取得し、タグごとの記事数をカウント
	const tagMap = new Map<string, number>();

	posts.forEach((post) => {
		post.tags.forEach((tag) => {
			const count = tagMap.get(tag) || 0;
			tagMap.set(tag, count + 1);
		});
	});

	// タグを配列に変換してソート
	const tags = Array.from(tagMap.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);

	return {
		tags,
		categories,
		site_title: 'ATSERVER Blog',
		logo: '/img/logo.webp',
		logo_alt: 'atserverロゴ'
	};
}
