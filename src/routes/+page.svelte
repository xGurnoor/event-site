<script>
	let range = Array(20);
</script>

<div class="navbar bg-base-100 flex justify-center">
	<div class="title mt-3 ml-7">
		<a href="/" class="btn btn-ghost normal-case text-xl text-sky-800 title">Makes360 Event</a>
	</div>
</div>
<div class="divider " />

<div class="m-6 flex flex-wrap image-full">
	{#each range as _}
		<!-- <div class="carousel-item">
			<img class="w-72" src="/image.jpg" alt="test" />
		</div> -->
		<div class="card m-10 w-60 bg-base-100">
			<figure><img class="" src="/image.jpg" alt="test" /></figure>
			<!-- <div class="card-body"> -->
			<button class="btn btn-primary border-radius-none">Download</button>
			<!-- </div> -->
		</div>
	{/each}
</div>

<style>
	.title {
		font-family: 'Roboto', sans-serif;
	}
</style>
