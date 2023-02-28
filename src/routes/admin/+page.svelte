<script lang="ts">
	import type { PageData } from './$types';
	import { draggable } from '@neodrag/svelte';
	import { invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';

	let count = 0;

	const moveUp = async (e: any) => {
		// @ts-ignore
		const id = e.target?.getAttribute('data-id');
		await fetch('/admin/move', {
			method: 'POST',
			body: JSON.stringify({ id, direction: 'up' })
		});
		await invalidate('load:data');
	};
	const moveDown = async (e: any) => {
		// @ts-ignore
		const id = e.target?.getAttribute('data-id');
		await fetch('/admin/move', {
			method: 'POST',
			body: JSON.stringify({ id, direction: 'down' })
		});
		await invalidate('load:data');
	};

	export let data: PageData;
</script>

<div class="navbar bg-base-100 flex justify-center">
	<div class="title mt-3 ml-7">
		<a href="#" class="btn btn-ghost normal-case text-xl text-sky-800 title">Event Dashboard</a>
	</div>
</div>
<div class="divider " />

<form method="POST" class="flex justify-center m-2" action="?/upload" enctype="multipart/form-data">
	<!-- <label class="label" for="file">Upload an image</label> -->
	<input
		name="file"
		type="file"
		class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
	/>
	<button class="btn btn-secondary border-secondary" type="submit">Upload</button>
</form>
<div class="m-6 flex flex-wrap image-full">
	{#each data.images as image}
		<!-- <div class="carousel-item">
			<img class="w-72" src="/image.jpg" alt="test" />
		</div> -->

		<div class="card m-10 w-60 bg-base-100">
			<figure><img class="" src="/images/{image.name}" alt="test" /></figure>
			<!-- <div class="card-body"> -->
			<div class="flex">
				{#if data.images[0] !== image}
					<button
						class="btn btn-primary border-radius-none flex-grow"
						data-id={image.id}
						on:click={moveUp}>{'<'}</button
					>
				{/if}
				<button
					class="btn btn-primary border-radius-none flex-grow"
					data-id={image.id}
					on:click={async (e) => {
						// @ts-ignore
						const id = e.target?.getAttribute('data-id');
						await fetch('/admin/delete', {
							method: 'POST',
							body: JSON.stringify({ id: id })
						});
						await invalidate('load:data');
					}}>Delete</button
				>
				<!-- <button class="btn btn-primary border-radius-none flex-grow">Edit</button> -->
				{#if data.images[data.images.length - 1] !== image}
					<button
						class="btn btn-primary border-radius-none flex-grow"
						data-id={image.id}
						on:click={moveDown}>{'>'}</button
					>
				{/if}
			</div>
			<!-- </div> -->
		</div>
	{/each}
</div>

<style>
	.title {
		font-family: 'Roboto', sans-serif;
	}
</style>
