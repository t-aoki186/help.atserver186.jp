<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { isVisible } from '$lib/stores/loader';

	//videoElementにHTMLVideoElement型を指定
	let videoElement: HTMLVideoElement;

	function handleClose() {
		isVisible.set(false);
	}

	onMount(() => {
		// 動画の長さが3秒なら、3000ms後に閉じる
		setTimeout(() => {
			isVisible.set(false);
		}, 3800);
	});
</script>

<div
	transition:fade={{ duration: 300 }}
	class="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-md"
	onclick={handleClose}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Escape' && handleClose()}
>
	<img
		src="https://pic.atserver186.jp/img/atserver/root/loading_anime.webp"
		alt="Loading..."
		class="mx-auto my-auto h-32 w-auto rounded-2xl"
	/>
	<!---->
	<!--s:ローディングオーバーレイを閉じるボタン-->
	<button
		class="absolute top-6 right-6 cursor-pointer text-3xl font-bold text-white opacity-70 hover:opacity-100"
		onclick={(e) => {
			e.stopPropagation();
			handleClose();
		}}
		title="閉じる"
	>
		<i class="tf26-icon-material icon-x-mark-thin text-white"></i>
	</button>
	<!--s:ローディングオーバーレイを閉じるボタン-->
</div>
