<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<div class="navbar bg-base-100 flex justify-center">
	<div class="title mt-3 ml-7">
		<a href="/" class="btn btn-ghost normal-case text-xl text-sky-800 title">Makes360 Event</a>
	</div>
</div>
<div class="divider " />

<div class="m-6 flex flex-wrap image-full">
	{#each data.images as image}
		<!-- <div class="carousel-item">
			<img class="w-72" src="/image.jpg" alt="test" />
		</div> -->
		<div class="card m-10 w-60 bg-base-100">
			<figure><img class="" src="/images/{image.name}" alt="test" /></figure>
			<!-- <div class="card-body"> -->
			<a
				class="btn btn-primary border-radius-none"
				download={image.name}
				href="/images/{image.name}">Download</a
			>
			<!-- </div> -->
		</div>
	{/each}
</div>

<style>
	.title {
		font-family: 'Roboto', sans-serif;
	}
</style>
