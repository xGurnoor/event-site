import { redirect, type Handle } from '@sveltejs/kit';
import { redis } from '$lib/server/redis';

export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const cookie = event.cookies.get('auth');
		if (!cookie) {
			// throw fail(401, { message: 'Not authorized!' });
			throw redirect(303, '/')
		}
		const sess = await redis.get(cookie);
		if (!sess) {
			// throw fail(401, { message: 'Not authorized!' });
			throw redirect(303, '/')
		}

	}
	if (event.url.pathname.startsWith('/login')) {
		const cookie = event.cookies.get('auth');
		if (cookie) {
			const s = await redis.get(cookie);
			if (s) {
				throw redirect(301, '/admin');
			}
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
