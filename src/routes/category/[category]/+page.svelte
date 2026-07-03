<script lang="ts">
	import type { Post } from '$lib/types';
	import PostCard from '$lib/components/PostCard.svelte';

	// Svelte 5 の $props() で data を受け取る
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal';

	// data.posts を使う（+page.server.ts から渡される）
	const posts = $derived(data.posts);

	const category = $derived(data.category);
	const getPageTitle = (category: string): string => {
		return `カテゴリ:${category}`;
	};
	let pageTitle = $derived(getPageTitle(category));
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<p class="text-xl mb-4">
	<i class="fa-solid fa-folder-open"></i>
	{category}
</p>

<PostCard {posts} />
