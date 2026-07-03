<script lang="ts">
	const { data } = $props();

	let pageTitle = 'タグ一覧';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<div class="mb-6">
	<p class="mb-4 text-xl">
		<i class="fa-solid fa-tags"></i>
		タグ一覧
	</p>
</div>

<div class="flex flex-wrap gap-3">
	{#each data.tags as { name, count } (name)}
		<a
			href="/tag/{name}"
			class="inline-flex border items-center gap-2 rounded-full px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-300"
		>
			<i class="fa-solid fa-tag text-sm"></i>
			<span class="font-semibold">{name}</span>
			<span class="rounded-full bg-gray-200 px-2 py-1 text-xs text-white dark:bg-gray-700">
				{count}
			</span>
		</a>
	{/each}
</div>

{#if data.tags.length === 0}
	<p class="text-gray-500">タグがまだありません</p>
{/if}
