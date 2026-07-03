<script>
	const { data } = $props();

	let pageTitle = 'サイトマップ';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<div class="mb-6">
	<p class="mb-4 text-xl">
		<i class="fa-solid fa-sitemap"></i>
		サイトマップ
	</p>
</div>

<div class="sitemap-container mt-4">
	<div class="sitemap-content">
		<h2
			class="border-l-[3px] border-(--main-text-color) text-lg font-bold tracking-[3px] text-(--main-text-color)"
		>
			メイン
		</h2>
		<ul class="sitemap-ul">
			<li>
				<a href="/category">
					<i class="fa-solid fa-house mr-1 text-xs"></i>
					<span>ホーム</span>
				</a>
			</li>
			<li>
				<a href="/category">
					<i class="fa-solid fa-folder mr-1 text-xs"></i>
					<span>カテゴリ一覧</span>
				</a>
			</li>
			<li>
				<a href="/tag">
					<i class="fa-solid fa-tags mr-1 text-xs"></i>
					<span>タグ一覧</span>
				</a>
			</li>
			<li>
				<a href="/search">
					<i class="fa-solid fa-magnifying-glass mr-1 text-xs"></i>
					<span>検索</span>
				</a>
			</li>
		</ul>
	</div>
	<div class="sitemap-content">
		<h2
			class="mt-2 border-l-[3px] border-(--main-text-color) text-lg font-bold tracking-[3px] text-(--main-text-color)"
		>
			情報
		</h2>
		<ul class="sitemap-ul">
			<li>
				<a href="/site/composition">
					<i class="fa-solid fa-circle-info mr-1 text-xs"></i>
					<span>構成</span>
				</a>
			</li>
			<li>
				<a href="/site/licence">
					<i class="fa-solid fa-gavel mr-1 text-xs"></i>
					<span>オープンソースライセンス</span>
				</a>
			</li>
			<li>
				<a href="/site/saucecode">
					<i class="fa-solid fa-code mr-1 text-xs"></i>
					<span>ソースコード</span>
				</a>
			</li>
		</ul>
	</div>
	<div class="sitemap-content">
		<h2
			class="mt-2 border-l-[3px] border-(--main-text-color) text-lg font-bold tracking-[3px] text-(--main-text-color)"
		>
			各種SNS / リンク
		</h2>
		<ul class="sitemap-ul">
			<li>
				<a href="https://x.com/t_aoki186" target="_blank">
					<i class="fa-brands fa-x-twitter mr-1 text-xs"></i>
					<span>X(Twitter)</span>
				</a>
			</li>
			<li>
				<a href="https://msk.atserver186.jp/t_aoki186" target="_blank">
					<i class="ats-custom-icon icon-misskey-mi mr-1 text-xs"></i>
					<span>あっとみすき(Misskey)</span>
				</a>
			</li>
			<li>
				<a href="https://github.com/t-aoki186" target="_blank">
					<i class="fa-brands fa-github mr-1 text-xs"></i>
					<span>Github</span>
				</a>
			</li>
			<li>
				<a href="https://gitlab.atserver186.jp/t-aoki186" target="_blank">
					<i class="fa-brands fa-gitlab mr-1 text-xs"></i>
					<span>Gitlab(atserver)</span>
				</a>
			</li>
			<li>
				<a href="http://atserver186.jp" target="_blank">
					<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
					<span>ATSERVERホーム</span>
				</a>
			</li>
			<li>
				<a href="/site/links">
					<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
					<span>すべてのリンクを確認する</span>
				</a>
			</li>
		</ul>
	</div>
</div>
<ol class="main-breadcrumb mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
	.sitemap-container {
		display: flex;
	}

	.sitemap-content {
		display: flex;
		flex-direction: column;
		width: calc(100% / 3);
	}

	.sitemap-ul {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	@media (max-width: 768px) {
		.sitemap-container {
			flex-direction: column;
		}

		.sitemap-content {
			width: 100%;
		}
	}
</style>
