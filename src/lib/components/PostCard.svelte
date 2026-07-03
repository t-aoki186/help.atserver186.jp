<script lang="ts">
	import type { Post } from '$lib/types';

	const { posts = [] }: { posts?: Post[] } = $props();

	function sanitizeTransitionName(str: string): string {
		return str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
	}
</script>

<div class="post-list-grid-item mr-0 md:mr-8">
	{#each posts as post}
		<a href={`/article/${post.category}/${post.slug}`}>
			<article
				class="article-card mb-4 flex gap-5 rounded-t-xs border-b-2 border-b-(--main-text-color) p-1 md:p-4"
			>
				<img
					src={post.thumbnail}
					alt="{post.title}のサムネイル"
					class="h-24 w-30 shrink-0 rounded-lg object-cover"
					style="view-transition-name: {sanitizeTransitionName(post.title)}-hero;"
				/>
				<div class="flex-1">
					<h2 class="text-bace mb-2 md:text-2xl">{post.title}</h2>
					<!--<p>{post.heading}</p>-->
					<div class="flex">
						<div class="ml-auto w-fit rounded-2xl border border-gray-500 px-2 py-1 text-right">
							<p class="text-xs"><i class="fa-solid fa-folder-open mr-1"></i>{post.category}</p>
						</div>
						<div class="ml-2 w-fit rounded-2xl border border-gray-500 px-2 py-1 text-right">
							<p class="text-xs"><i class="fa-regular fa-circle-user mr-1"></i>{post.author}</p>
						</div>
					</div>
				</div>
			</article>
		</a>
	{/each}
</div>
