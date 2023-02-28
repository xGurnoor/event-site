import { error, type RequestHandler } from "@sveltejs/kit";
import { redis } from '$lib/server/redis';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const cookie = cookies.get('auth');
    if (!cookie) {
        throw error(401, 'Not authorized!')
    }
    const auth = await redis.get(cookie);
    if (!auth) {
        throw error(401, 'Not authorized!')
    }
    const data = await request.json();
    console.log('Image to change: ', data.id)
    const images = await prisma.image.findMany();
    images.sort((a, b) => a.position - b.position)

    let position = -1;
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.id === data.id) {
            position = image.position;
            if (data.direction === 'up') {
                position -= 1;
                images[i].position = position
                images[i - 1].position += 1;
            } else {
                position += 1;
                images[i].position = position
                images[i + 1].position -= 1;

            }

        }

    }
    for (let image of images) {
        await prisma.image.update({
            where: { id: image.id },
            data: {
                position: image.position
            }
        })
    }
    return new Response('Success');
};