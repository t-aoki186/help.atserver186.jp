<script>
	import { page } from '$app/state';
</script>

{#if page.status === 404}
	<div class="m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">404</p>
	</div>
	<section class="mx-auto mt-25 mb-8">
		<div class="my-4 min-w-full">
			<p class="text-3xl">お探しのページは見つかりませんでした。</p>
		</div>
		<a href="/" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>トップページに戻る</span>
			</div>
		</a>
	</section>
{:else if page.status === 500}
	<h1>500</h1>
{:else}
	<h1>不明なエラーが発生しました。</h1>
{/if}
