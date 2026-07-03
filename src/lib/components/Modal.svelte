<script lang="ts">
	let { showModal = $bindable(), children } = $props();

	let visible = $state(false);
	let closing = $state(false);

	//showModal が true になったら表示開始
	$effect(() => {
		if (showModal) {
			visible = true;
			closing = false;
		} else if (visible) {
			//閉じるアニメーション開始
			closing = true;
			setTimeout(() => {
				visible = false;
			}, 200); //アニメーション時間と合わせる
		}
	});

	const close = () => {
		showModal = false;
	};
</script>

{#if visible}
	<div
		class="modal-backdrop {closing ? 'fade-out' : 'fade-in'}"
		role="button"
		tabindex="0"
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && close()}
		onclick={(e) => e.target === e.currentTarget && close()}
	>
		<div class="main-modal {closing ? 'pop-out' : 'pop-in'}" role="dialog" aria-modal="true">
			{@render children?.()}
			<div class="mt-auto">
				<hr class="main-hr" />
				<button onclick={close} class="link-main" type="button">
					<div class="link-main-underline">
						<i class="fa-solid fa-xmark"></i>
						<span>閉じる</span>
					</div>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	/*フェードイン*/
	.fade-in {
		animation: fadeIn 0.2s ease forwards;
	}

	/*フェードアウト*/
	.fade-out {
		animation: fadeOut 0.2s ease forwards;
	}

	.main-modal {
		display: flex;
		flex-direction: column;
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		width: min(800px, 90vw);
		height: 80vh;
		overflow: auto;
		position: relative;
	}

	/*モーダルの拡大アニメーション*/
	.pop-in {
		animation: popIn 0.2s ease forwards;
	}

	.pop-out {
		animation: popOut 0.2s ease forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes popIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes popOut {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	@media (max-width: 600px) {
		.main-modal {
			min-width: 100%;
			min-height: 70%;
			margin-top: auto;
			margin-bottom: 0;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
</style>
