import { fail, redirect, type Actions } from '@sveltejs/kit';
import * as argon from 'argon2';
import { prisma } from '$lib/server/prisma';
import { redis } from '$lib/server/redis';
import { v4 as uuid } from 'uuid';

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
		const uid = uuid();
		const maxAge = Date.now() + 86400;
		redis.set(uid, user.username, {
			EX: maxAge
		})

		cookies.set('auth', uid, { maxAge });
		throw redirect(303, '/admin');
	}
};
