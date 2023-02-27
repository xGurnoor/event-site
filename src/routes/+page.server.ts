import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	const images = await prisma.image.findMany();
	images.sort((a, b) => {
		return a.position - b.position;
	});
	return { images };
};
