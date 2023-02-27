<script lang="ts">
	import { browser } from '$app/environment';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';

	export let form: ActionData;
	if (form?.error) {
		toast.error(form?.error, {
			duration: 5000
		});
		// alert('ur mom gei');
	}
</script>

<div class="flex justify-center mt-28">
	<form method="POST" class="flex flex-col">
		<label for="username" class="label label-text">Username</label>
		<input
			name="username"
			type="text"
			placeholder="username"
			class="input input-bordered input-primary"
		/>
		<label for="password" class="mt-5 label label-text">Password</label>
		<input
			name="password"
			type="password"
			placeholder="password"
			class="input input-bordered input-primary"
		/>
		<button type="submit" class="btn btn-primary mt-5">Login</button>
	</form>
</div>
