import { error, type RequestHandler } from "@sveltejs/kit";
import { redis } from '$lib/server/redis';
import { prisma } from '$lib/server/prisma'
import { unlink } from 'fs/promises';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const cookie = cookies.get('auth');
    if (!cookie) {
        throw error(401, 'Not authorized!')
    }
    const auth = redis.get(cookie);
    if (!auth) {
        throw error(401, 'Not authorized!');
    }
    const data = await request.json()
    console.log(data)
    const id = data.id;

    const image = await prisma.image.findFirst({
        where: { id }
    })
    if (!image) {
        return new Response('Success')
    }

    const name = image.name;
    await prisma.image.delete({
        where: { id }
    })

    const path = `/home/hp/event-site/static/images/${name}`;

    await unlink(path);
    return new Response();
};