<script>
	const { data } = $props();

	let pageTitle = 'ソースコード';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<div class="mb-6">
	<p class="mb-4 text-xl">
		<i class="fa-solid fa-code"></i>
		{pageTitle}
	</p>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<a
			href="https://github.com/t-aoki186/blog.atserver186.jp.git" target="_blank"
			class="block rounded-lg border p-4 transition hover:bg-gray-100 dark:hover:bg-gray-300"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<i class="fa-brands fa-github text-lg"></i>
					<span class="font-semibold">Githubリポジトリ</span>
				</div>
			</div>
		</a>
		<a
			href="https://gitlab.atserver186.jp/t-aoki186/blog.atserver186.jp.git" target="_blank"
			class="block rounded-lg border p-4 transition hover:bg-gray-100 dark:hover:bg-gray-300"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<i class="fa-brands fa-gitlab text-lg"></i>
					<span class="font-semibold">Gitlabリポジトリ</span>
				</div>
			</div>
		</a>
	</div>
</div>
