<script lang="ts">
	import type { Post } from '$lib/types';
	import PostCard from '$lib/components/PostCard.svelte';

	// Svelte 5 の $props() で data を受け取る
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal';

	// data.posts を使う（+page.server.ts から渡される）
	const posts = $derived(data.posts);

	const tag = $derived(data.tag);
	const getPageTitle = (tag: string): string => {
		return `タグ:${tag}`;
	};
	let pageTitle = $derived(getPageTitle(tag));
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<p class="mb-4 text-xl">
	<i class="fa-solid fa-tag"></i>
	{tag}
</p>

<PostCard {posts} />
