import type { PageServerLoad, Actions } from './$types';
import { writeFile } from 'fs/promises';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';

export const load: PageServerLoad = async ({ depends }) => {
    depends('load:data')
    const images = await prisma.image.findMany();
    images.sort((a, b) => {
        return a.position - b.position;
    });
    return { images };
};


export const actions = {
    upload: async ({ request }) => {
        const data = await request.formData()
        const file = data.get('file') as File
        let name = file.name;
        let temp = name.split('/')
        temp = temp[temp.length - 1].split('\\')
        name = temp[temp.length - 1]

        temp = name.split('.')
        const ex = temp.pop() as string;
        if (!['jpg', 'jpeg', 'png', 'webp'].includes(ex)) {
            throw error(400, 'Mime type not allowed!')
        }
        temp.push('makes360')
        const uid = uuid().slice(0, 8);
        temp.push(uid);
        name = temp.join('_') + '.' + ex

        await writeFile(`/home/hp/event-site/static/images/${name}`, new Uint8Array(await file.arrayBuffer()))
        await prisma.image.create({
            data: {
                name
            }
        })



    }
} satisfies Actions;
