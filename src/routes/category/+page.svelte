<script lang="ts">
	const { data } = $props();

	let pageTitle = 'カテゴリ一覧';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<div class="mb-6">
	<p class="mb-4 text-xl">
		<i class="fa-solid fa-folder"></i>
		カテゴリ一覧
	</p>
</div>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each data.categories as { name, count } (name)}
		<a
			href="/category/{name}"
			class="block rounded-lg border p-4 transition hover:bg-gray-100 dark:hover:bg-gray-300"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<i class="fa-solid fa-folder-open text-lg"></i>
					<span class="font-semibold">{name}</span>
				</div>
				<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-white dark:bg-gray-700">
					{count}
				</span>
			</div>
		</a>
	{/each}
</div>

{#if data.categories.length === 0}
	<p class="text-gray-500">カテゴリがまだありません</p>
{/if}
