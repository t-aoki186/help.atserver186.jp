<script lang="ts">
	const { data } = $props();

	let pageTitle = 'オープンソースライセンス';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<div class="mb-6">
	<p class="mb-4 text-xl">
		<i class="fa-solid fa-gavel"></i>
		オープンソースライセンス
	</p>
</div>

<div class="mt-4">
	<p class="mb-4 text-sm">生成日時: {data.generatedAt}</p>
	{#each data.modules as module}
		<article class="mb-2 rounded-2xl bg-gray-200 p-4">
			<h2 class="text-lg font-semibold">{module.name}</h2>
			<p class="mt-1 text-sm">
				バージョン:{module.version}<br />
				ライセンス:{module.license ? `(${module.license})` : ''}<br />
			</p>
		</article>
	{/each}
	<article class="mb-2 rounded-2xl bg-gray-200 p-4">
		<h2 class="text-lg font-semibold">Font Awesome Free</h2>
		<p class="mt-1 text-sm">
			バージョン:null<br />
			ライセンス:Icons - CC BY 4.0 License / Fonts - SIL OFL 1.1 License / Code - MIT License<br />
		</p>
	</article>
	<article class="mb-2 rounded-2xl bg-gray-200 p-4">
		<h2 class="text-lg font-semibold">CSS Stock</h2>
		<p class="mt-1 text-sm">
			バージョン:null<br />
			ライセンス:独自ライセンス（商用利用可）<br />
		</p>
	</article>
	<article class="mb-2 rounded-2xl bg-gray-200 p-4">
		<h2 class="text-lg font-semibold">ICOON MONO</h2>
		<p class="mt-1 text-sm">
			バージョン:null<br />
			ライセンス:独自ライセンス（商用利用可）<br />
		</p>
	</article>
	<article class="mb-2 rounded-2xl bg-gray-200 p-4">
		<h2 class="text-lg font-semibold">iconmonstr</h2>
		<p class="mt-1 text-sm">
			バージョン:null<br />
			ライセンス:独自ライセンス（商用利用可）<br />
		</p>
	</article>
	<article class="mb-2 rounded-2xl bg-gray-200 p-4">
		<h2 class="text-lg font-semibold">シルエットイラスト</h2>
		<p class="mt-1 text-sm">
			バージョン:null<br />
			ライセンス:独自ライセンス（商用利用可）<br />
		</p>
	</article>
	<article class="mb-2 rounded-2xl bg-gray-200 p-4">
		<h2 class="text-lg font-semibold">Misskey ロゴ</h2>
		<p class="mt-1 text-sm">
			バージョン:null<br />
			ライセンス:CC BY-SA<br />
		</p>
	</article>
</div>
