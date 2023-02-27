// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from '@prisma/client';
import type { RedisClientType } from 'redis';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	var prisma: PrismaClient;
	var redis: RedisClientType
}

export {};
