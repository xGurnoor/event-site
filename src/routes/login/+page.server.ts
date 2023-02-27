import { fail, type Actions } from '@sveltejs/kit';
import * as argon from 'argon2';
import { prisma } from '$lib/server/prisma';

type Login = {
	username: string;
	password: string;
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { username, password } = Object.fromEntries(await request.formData()) as Login;
		const user = await prisma.user.findFirst({
			where: { username }
		});
		if (!user) {
			return fail(401, { error: 'Invalid username or password!' });
		}

		const valid = argon.verify(user.password, password);
		if (!valid) {
			return fail(401, { error: 'Invalid username or password!' });
		}
		cookies.set('auth', 'sdkjfjkd');
	}
};
