import { fail, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const cookie = event.cookies.get('auth');
		if (!cookie) {
			throw fail(401, { message: 'Not authorized!' });
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
