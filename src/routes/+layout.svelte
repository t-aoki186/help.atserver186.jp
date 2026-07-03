<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	/*ローディング*/
	import { isVisible, hasInitialized } from '$lib/stores/loader.js';
	import Loading from '$lib/components/Loading.svelte';
	/*独自スタイル*/
	import './layout.css';
	import './icon.css';
	import './components.css';
	/*favicon*/
	import favicon from '$lib/assets/favicon.png';
	import { get } from 'svelte/store';
	/*NProgress*/
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	//AOS(Animate On Scroll)
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	/*Sveltekit-View-Transition(ページ遷移時のアニメーション)*/
	import { setupViewTransition } from 'sveltekit-view-transition';
	/*モーダル*/
	import Modal from '$lib/components/Modal.svelte';
	/*SEO*/
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';

	/*s:NProgressの設定*/
	beforeNavigate(() => {
		NProgress.start();
	});

	afterNavigate(() => {
		NProgress.done();
		// ページ遷移時にメニューを閉じる
		open = false;
		otherOpen = false;
	});
	/*e:NProgressの設定*/

	//export
	let { data, children } = $props();
	let accordionOpen = $state(false);

	/*s:共通変数*/
	let logo = '/img/logo.webp';
	let logo_alt = 'atserverロゴ';
	/*e:共通変数*/

	/*s:ハンバーガーメニュー*/
	let open = $state(false);
	let isOtherClosing = $state(false);
	let otherOpen = $state(false);
	let pendingOpen = false;
	/*e;ハンバーガーメニュー*/

	/*s:target="_blank"モーダル*/
	let targetUrl = $state('');
	let showLinkModal = $state(false);
	let skipExternalLinkConfirmation = $state(false);
	/*e:target="_blank"モーダル*/

	/*s:ヘッダーその他メニュー*/
	function closeOther(goBackToMenu: boolean = false) {
		if (goBackToMenu) pendingOpen = true;
		otherOpen = false;
	}
	/*e:ヘッダーその他メニュー*/
	//100pxスクロールでヘッダーの表示を変更
	let scrolled = $state(false);
	//ヘッダー
	const headerClass = $derived(
		`fixed top-0 right-0 left-0 z-20 border border-black/10 bg-white/80 backdrop-blur-md transition-all duration-500 overflow-hidden` +
			(scrolled ? ' scroll-nav' : '') +
			(otherOpen
				? ' max-h-[100vh] rounded-b-[1.0rem]'
				: open
					? ' max-h-[400px] rounded-b-[1.0rem]'
					: ' max-h-[56px]')
	);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 100;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
	/*e:スクロールでヘッダーサイズ変更*/

	/*s:モーダル*/
	let showModal = $state(false);
	let modalType = $state('');

	function openModal(type: string) {
		showModal = true;
		modalType = type;
	}
	/*e:モーダル*/

	/*s:AOSの初期化*/
	onMount(() => {
		AOS.init({
			// オプション（任意）
			duration: 800, //アニメーションの時間（ミリ秒）
			once: false //何度でもアニメーションを発火させる
		});
	});
	/*e:AOSの初期化*/

	/*s:View Transition*/
	setupViewTransition();
	/*e:View Transition*/

	/*ローディングアニメーション*/
	onMount(() => {
		// localStorage をチェック
		const alreadySeen = localStorage.getItem('hasSeenIntro');

		if (!alreadySeen) {
			//初回アクセスの場合
			isVisible.set(true);

			//動画を視聴済みのフラグを追加
			localStorage.setItem('hasSeenIntro', 'true');

			//動画の長さに合わせて自動で消す（動画のendedイベントを使わない場合の保険）
			setTimeout(() => {
				isVisible.set(false);
			}, 5000);
		}
	});

	onNavigate((navigation) => {
		// ブラウザが View Transitions API に対応していない場合は何もしない
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	/*s:ローディングアニメーションをもう一度視聴する*/
	function replayAnimation() {
		isVisible.set(true);
	}
	/*e:ローディングアニメーションをもう一度視聴する*/

	import { goto } from '$app/navigation';

	// タブとパスのマッピング
	const tabMap: Record<string, string> = {
		home: '/',
		search: '/search',
		category: '/category',
		tag: '/tag'
	};

	// パスからタブIDを取得
	function getTabFromPath(path: string): string {
		for (const [tab, route] of Object.entries(tabMap)) {
			if (path === route) return tab;
		}
		return 'home';
	}

	// 選択中のタブ（ローカルステート）
	let selectedTab = $state(getTabFromPath($page.url.pathname));

	// タブクリック時のハンドラ
	function handleTabClick(tab: string, event: MouseEvent) {
		event.preventDefault(); // デフォルト動作をキャンセル（ラジオボタンのチェックを手動で制御）
		const path = tabMap[tab];
		if (!path) return;
		if ($page.url.pathname === path) return; // 同じページなら何もしない

		// 即座にUIを更新（サムの移動）
		selectedTab = tab;

		// サムのトランジション完了後にページ遷移（カクつき防止）
		setTimeout(() => {
			goto(path);
		}, 420);
	}

	// ページ遷移後にパスを監視し、タブを補正（ブラウザバックなど）
	afterNavigate(() => {
		const currentPath = $page.url.pathname;
		const tab = getTabFromPath(currentPath);
		if (tab !== selectedTab) {
			selectedTab = tab;
		}
	});

	// サムの移動量を計算
	const thumbTransform = $derived.by(() => {
		const positions: Record<string, string> = {
			home: 'translateX(0%)',
			search: 'translateX(102%)',
			category: 'translateX(204%)',
			tag: 'translateX(306%)'
		};
		return positions[selectedTab] || 'translateX(0%)';
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.atserver186.jp/libs/fontawesome/css/all.min.css" />
	<link rel="icon" href={favicon} />
	<!--s:SEO-->
	<!--各ページでheadに内容がなければ以下の内容が表示される-->
	<title>ATSERVER tos</title>
	<meta name="description" content="ATSERVERのブログです。" />
	<meta name="keywords" content="ブログ,ATSERVER,技術" />
	<meta property="og:site_name" content="ATSERVER tos" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://tos.atserver186.jp/ogp.png" />
	<meta property="og:title" content="ATSERVER tos" />
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@t_aoki186" />
	<!--e:SEO-->
</svelte:head>

<Modal bind:showModal>
	{#if modalType === 'search'}
		<form class="s-search-form mb-4" action="/organizations/" method="GET">
			<input
				class="s-search-input"
				type="text"
				id="searchTerm"
				name="search"
				placeholder="検索..."
			/>
			<button class="m-search-button" type="submit" title="検索する"
				><i class="fas fa-search"></i></button
			>
		</form>
		<div class="relative m-auto mt-10 mb-4 max-w-125 bg-white">
			<!-- 左下の角 -->
			<span
				class="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-(--main-text-color)"
			></span>
			<!-- 右下の角 -->
			<span
				class="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-(--main-text-color)"
			></span>
			<!-- コンテンツ -->
			<div class="flex justify-center gap-4 font-bold text-(--main-text-color)">
				<div class="tp-search-method">
					<a href="/organizations" class="dash-link">
						<i class="fa-solid fa-list"></i>
						<p>絞り込む</p>
					</a>
				</div>
				<div class="tp-search-method">
					<a href="/timetable" class="dash-link">
						<i class="fa-solid fa-list"></i>
						<p>タイムテーブルから<br />探す</p>
					</a>
				</div>
			</div>
		</div>
	{/if}
</Modal>

{#if $isVisible}
	<Loading />
{/if}

<header class={headerClass}>
	<div class="flex items-center justify-between px-2 py-2">
		<!--s:ロゴ-->
		<a href="/" class="flex shrink-0 whitespace-nowrap transition">
			<img src={logo} alt="" class="h-10 w-auto rounded-xl" />
			<p class="header-text m-auto ml-2 font-bold">tos</p>
		</a>
		<!--e:ロゴ-->
		<!---->
		<div class="flex items-center md:hidden">
			<!--s:スマホ用検索ボタン-->
			<button
				onclick={() => openModal('a')}
				type="button"
				title="検索する"
				class="mr-4 cursor-pointer text-sm"><i class="fa-solid fa-magnifying-glass"></i></button
			>
			<!--e:スマホ用検索ボタン-->
			<!---->
			<!--s:スマホ用ハンバーガー / その他メニュー閉じる-->
			<div class="grid">
				{#if !otherOpen}
					<button
						class="col-start-1 row-start-1 flex cursor-pointer flex-col gap-1.5"
						transition:fade={{ duration: 300 }}
						onclick={() => (open = !open)}
						title="メニュー"
					>
						<div class="flex h-10 w-9 cursor-pointer flex-col items-center justify-center">
							<input class="peer hidden" type="checkbox" checked={open} />
							<div
								class="header-hamburger h-0.5 w-[50%] origin-left translate-y-[0.45rem] rounded-sm bg-black transition-all duration-300 peer-checked:-rotate-45"
							></div>
							<div
								class="header-hamburger h-0.5 w-[50%] origin-center rounded-md bg-black transition-all duration-300 peer-checked:hidden"
							></div>
							<div
								class="header-hamburger h-0.5 w-[50%] origin-left translate-y-[-0.45rem] rounded-md bg-black transition-all duration-300 peer-checked:rotate-45"
							></div>
						</div>
					</button>
				{/if}

				{#if otherOpen}
					<button
						class="col-start-1 row-start-1 flex cursor-pointer flex-col gap-1.5"
						transition:fade={{ duration: 300 }}
						onclick={() => closeOther(open)}
						title="メニュー"
					>
						<div class="flex h-10 w-9 cursor-pointer flex-col items-center justify-center">
							<i class="fa-solid fa-angle-left other-close-ico"></i>
						</div>
					</button>
				{/if}
			</div>
			<!--s:スマホ用ハンバーガー / その他メニュー閉じる-->
		</div>
		<!---->
		<!--s:PC用メニュー-->
		<nav class="hidden md:flex">
			<ul class="flex items-center gap-5 whitespace-nowrap transition">
				<li>
					<button
						onclick={() => openModal('a')}
						type="button"
						class="header-text header-search-btn ml-3 text-xs tracking-wider transition"
						><i class="fa-solid fa-magnifying-glass mr-1"></i><kbd>Ctrl&nbsp;K</kbd></button
					>
				</li>
				<li>
					<a href="/" class="header-text ml-3 text-xs tracking-wider transition">ホーム</a>
				</li>
				<li>
					<a href="/category/server" class="header-text ml-3 text-xs tracking-wider transition"
						>サーバー</a
					>
				</li>
				<li>
					<a
						href="/category/electric_work"
						class="header-text ml-3 text-xs tracking-wider transition">電子工作</a
					>
				</li>
				<li>
					<a href="/category/fix" class="header-text ml-3 text-xs tracking-wider transition">修理</a
					>
				</li>
				<li>
					<a href="/category/unknown" class="header-text ml-3 text-xs tracking-wider transition"
						>未分類</a
					>
				</li>
				<li class="mr-6">
					<button
						class="header-text ml-3 cursor-pointer text-xs tracking-wider transition"
						onclick={() => (otherOpen = !otherOpen)}>その他</button
					>
				</li>
			</ul>
		</nav>
		<!--e:PC用メニュー-->
	</div>

	<!--スマホ用メニュー-->
	{#if !otherOpen && !isOtherClosing}
		<nav class="px-6 pt-6 pb-6 md:hidden">
			<ul class="flex flex-col gap-4 text-sm tracking-wide">
				<li><a href="/" class="header-text">ホーム</a></li>
				<li><a href="/category/server" class="header-text">サーバー</a></li>
				<li><a href="/category/electric_work" class="header-text">電子工作</a></li>
				<li><a href="/category/fix" class="header-text">修理</a></li>
				<li><a href="/category/unknown" class="header-text">未分類</a></li>
				<li>
					<button class="header-text" onclick={() => (otherOpen = !otherOpen)}>その他</button>
				</li>
			</ul>
		</nav>
	{/if}

	{#if otherOpen}
		<nav
			class="overflow-auto p-6"
			transition:fade={{ duration: 500 }}
			onoutrostart={() => (isOtherClosing = true)}
			onoutroend={() => {
				isOtherClosing = false;
				if (pendingOpen) {
					open = true;
					pendingOpen = false;
				}
			}}
		>
			<ul class="flex flex-col gap-4 text-sm tracking-wide">
				<li>
					<a href="/category" class="header-text">
						<i class="fa-solid fa-folder mr-1 text-xs"></i>
						<span>カテゴリ一覧</span>
					</a>
				</li>
				<li>
					<a href="/tag" class="header-text">
						<i class="fa-solid fa-tags mr-1 text-xs"></i>
						<span>タグ一覧</span>
					</a>
				</li>
				<li>
					<a href="/site/sitemap" class="header-text"
						><i class="fa-solid fa-sitemap mr-1 text-xs"></i>サイトマップ</a
					>
				</li>
				<li>
					<a href="/site/licence" class="header-text"
						><i class="fa-solid fa-rectangle-list mr-1 text-xs"></i>オープンソースライセンス</a
					>
				</li>
				<li>
					<a href="/site/saucecode" class="header-text" target="_blank"
						><i class="fa-solid fa-code mr-1 text-xs"></i>ソースコード</a
					>
				</li>
				<li>
					<a href="/site/links" class="header-text" target="_blank"
						><i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>各種SNS / リンク</a
					>
				</li>
				<li>
					<a href="https://atserver186.jp/contact" class="header-text" target="_blank"
						><i class="fa-solid fa-envelope mr-1 text-xs"></i>お問い合わせ</a
					>
				</li>
				<hr class="main-hr" />
				<button class="header-text" onclick={() => closeOther(open)}>
					<i class="fa-solid fa-angle-left mr-1 text-xs"></i>
					{#if open}メニューに戻る{/if}
					{#if !open}閉じる{/if}
				</button>
			</ul>
		</nav>
	{/if}
</header>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<section class="container mx-auto mt-20 mb-25">
		<div class="post-list-content">
			<div class="main-content-area">
				{@render children()}
			</div>
			<aside class="aside-content" style="border-left: 1px solid #000;">
				<div class="ml-8 w-full">
					<form
						action="/search/"
						class="flex w-full items-center overflow-hidden py-4"
						method="GET"
					>
						<label class="flex-1">
							<input
								type="text"
								class="sf-input h-11.25 w-full border-none"
								placeholder="キーワードを入力"
							/>
						</label>
						<button type="submit" class="sf-submit h-11.25 w-12.5 cursor-pointer" aria-label="検索"
						></button>
					</form>
					<hr class="main-hr" style="margin-bottom: 1rem !important;" />
					<p class="border-l-3 border-gray-500 pl-2 text-xl">最近の投稿</p>
					<div class="mb-4">テスト</div>
					<p class="border-l-3 border-gray-500 pl-2 text-xl">カテゴリ</p>
					<div class="my-4 flex flex-col gap-2">
						{#each data.categories as { name, count } (name)}
							<a
								href="/category/{name}"
								class="block rounded-lg border p-2 transition hover:bg-gray-100 dark:hover:bg-gray-300"
							>
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<i class="fa-solid fa-folder-open text-lg"></i>
										<span class="font-semibold">{name}</span>
									</div>
									<span
										class="rounded-full bg-gray-200 px-3 py-1 text-sm text-white dark:bg-gray-700"
									>
										{count}
									</span>
								</div>
							</a>
						{/each}
					</div>
					<p class="border-l-3 border-gray-500 pl-2 text-xl">タグ</p>
					<div class="my-4 flex flex-wrap gap-3">
						{#each data.tags as { name, count } (name)}
							<a
								href="/tag/{name}"
								class="inline-flex items-center gap-1 rounded-full border p-1 text-xs transition hover:bg-gray-100 dark:hover:bg-gray-300"
							>
								<i class="fa-solid fa-tag"></i>
								<span class="font-semibold">{name}</span>
								<span
									class="rounded-full bg-gray-200 px-1.5 py-0.5 text-xs text-white dark:bg-gray-700"
								>
									{count}
								</span>
							</a>
						{/each}
					</div>
				</div>
			</aside>
		</div>
	</section>
</main>

<div class="cc-ios-tabs bottom-nav md:hidden">
	<!-- ラジオボタンは非表示だが、checked属性はselectedTabと連動 -->
	<input
		type="radio"
		name="cc-ios-tabs"
		value="home"
		id="cc-tab-home"
		class="hidden"
		checked={selectedTab === 'home'}
		onclick={(e) => handleTabClick('home', e)}
	/>
	<input
		type="radio"
		name="cc-ios-tabs"
		value="search"
		id="cc-tab-search"
		class="hidden"
		checked={selectedTab === 'search'}
		onclick={(e) => handleTabClick('search', e)}
	/>
	<input
		type="radio"
		name="cc-ios-tabs"
		value="category"
		id="cc-tab-category"
		class="hidden"
		checked={selectedTab === 'category'}
		onclick={(e) => handleTabClick('category', e)}
	/>
	<input
		type="radio"
		name="cc-ios-tabs"
		value="tag"
		id="cc-tab-tag"
		class="hidden"
		checked={selectedTab === 'tag'}
		onclick={(e) => handleTabClick('tag', e)}
	/>

	<div class="sp-bottom-bar_control bg-white/80 backdrop-blur-md">
		<div class="sp-bottom-bar_thumb" style="transform: {thumbTransform};"></div>
		<button
			class="sp-bottom-bar_item"
			class:active={selectedTab === 'home'}
			onclick={(e) => handleTabClick('home', e)}
			aria-label="ホーム"
		>
			<i class="fa-solid fa-house"></i>
		</button>
		<button
			class="sp-bottom-bar_item"
			class:active={selectedTab === 'search'}
			onclick={(e) => handleTabClick('search', e)}
			aria-label="検索"
		>
			<i class="fa-solid fa-magnifying-glass"></i>
		</button>
		<button
			class="sp-bottom-bar_item"
			class:active={selectedTab === 'category'}
			onclick={(e) => handleTabClick('category', e)}
			aria-label="カテゴリ"
		>
			<i class="fa-solid fa-folder"></i>
		</button>
		<button
			class="sp-bottom-bar_item"
			class:active={selectedTab === 'tag'}
			onclick={(e) => handleTabClick('tag', e)}
			aria-label="タグ"
		>
			<i class="fa-solid fa-tags"></i>
		</button>
	</div>
</div>

<!--フッター-->
<footer class="footer m-0 w-full">
	<div class="container">
		<!--s:PC表示用-->
		<div class="hidden md:flex">
			<div class="footer-top-content">
				<!-- フッターの左側コンテンツ -->
				<div class="footer-flex-content">
					<div class="footer-logo">
						<a href="/">
							<img src={logo} alt={logo_alt} class="h-auto w-25 rounded-xl" />
						</a>
					</div>
				</div>

				<!-- フッターの右側コンテンツ -->
				<div class="footer-flex-content">
					<h4>メイン</h4>
					<ul>
						<li>
							<button onclick={replayAnimation} class="cursor-pointer text-white">
								<i class="fa-solid fa-circle-play mr-1 text-xs"></i>
								<span>アニメーションをもう一度見る</span></button
							>
						</li>
						<li>
							<a href="/">
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
				<div class="footer-flex-content">
					<h4>情報</h4>
					<ul>
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
				<div class="footer-flex-content">
					<h4>各種SNS / リンク</h4>
					<ul>
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
							<a href="/site/links" target="_blank">
								<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
								<span>すべてのリンクを確認する</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--e:PC表示用-->
		<!---->
		<!--s:モバイル表示用-->
		<div class="flex w-full flex-col p-1 md:hidden">
			<!--s:ロゴ・住所-->
			<div class="flex flex-col items-center justify-center gap-4">
				<a href="/">
					<img src={logo} alt={logo_alt} class="mt-4 h-auto w-20 rounded-xl" />
				</a>
			</div>
			<!--s:ロゴ・住所-->
			<!---->
			<!--s:アコーディオン-->
			<div class="mt-8">
				<details class="accordion-main mb-4 min-w-full">
					<summary class="font-bold">メイン</summary>
					<ul class="pt-2 pl-2">
						<li>
							<button onclick={replayAnimation} class="cursor-pointer text-white">
								<i class="fa-solid fa-circle-play mr-1 text-xs"></i>
								<span>アニメーションをもう一度見る</span></button
							>
						</li>
						<li>
							<a href="/">
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
				</details>
				<details class="accordion-main mb-4 min-w-full">
					<summary class="font-bold">情報</summary>
					<ul class="pt-2 pl-2">
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
				</details>
				<details class="accordion-main min-w-full">
					<summary class="font-bold">各種SNS / リンク</summary>
					<ul class="pt-2 pl-2">
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
							<a href="/site/links" target="_blank">
								<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
								<span>すべてのリンクを確認する</span>
							</a>
						</li>
					</ul>
				</details>
			</div>
			<!--e:アコーディオン-->
		</div>
		<!--e:モバイル表示用-->
		<!---->
		<!--s:フッター最下部-->
		<div class="footer-bottom-content mx-auto">
			<br />
			<hr class="sub-hr" />
			<br />
			<a href="/site/site-policy" class="footer-link" style="margin-right: 10px;">サイトポリシー</a
			><span class="footer-span">|</span>
			<a
				href="/site/privacy-policy"
				class="footer-link"
				style="margin-right: 10px; margin-left: 10px;">プライバシーポリシー</a
			><span class="footer-span">|</span>
			<a
				href="https://atserver186.jp/contact"
				class="footer-link"
				style="margin-left: 10px;"
				target="_blank">お問い合わせ</a
			>
			<p class="footer-text">
				&copy; 2026 ATSERVER. | tos.atserver186.jp All Rights Reserved.
				本サイトの無断転載は、固くこれを禁じます。
			</p>
			<div class="mb-16 md:mb-0"><p class="hidden">hidden-marigin-bottom</p></div>
		</div>
		<!--e:フッター最下部-->
	</div>
</footer>

<style>
	/* 元のスタイル（ほぼそのまま） */
	.cc-ios-tabs {
		display: none;
	}

	@media (max-width: 768px) {
		.cc-ios-tabs {
			display: flex;
			justify-content: center;
			width: 100%;
			padding: 8px 16px; /* 上下を狭く */
		}
	}

	.sp-bottom-bar_input {
		display: none;
	}

	.sp-bottom-bar_control {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		align-items: center;
		width: 100%;
		max-width: 400px;
		padding: 5px;
		border-radius: 999px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.sp-bottom-bar_thumb {
		position: absolute;
		top: 5px;
		left: 5px;
		width: calc(25% - 4px);
		height: calc(100% - 10px);
		border-radius: 999px;
		background: #0b1220;
		box-shadow:
			0 1px 2px rgba(15, 23, 42, 0.2),
			0 8px 20px rgba(15, 23, 42, 0.16);
		transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
	}

	.sp-bottom-bar_item {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		border-radius: 999px;
		color: #6b7280;
		font-size: 14px;
		font-weight: 600;
		line-height: 1;
		cursor: pointer;
		user-select: none;
		transition: color 260ms ease;
	}

	.sp-bottom-bar_item:hover {
		color: #374151;
	}

	.sp-bottom-bar_item.active {
		color: #ffffff;
	}

	@media (prefers-reduced-motion: reduce) {
		.sp-bottom-bar_thumb,
		.sp-bottom-bar_item {
			transition: none;
		}
	}

	/* ---- 下部固定用の追加スタイル ---- */
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 40;
	}
</style>
