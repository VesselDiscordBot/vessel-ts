import type { Prisma, PrismaClient } from '@prisma/client';
import type { Dayjs } from 'dayjs';

/**
 * Env Typing
 */
declare module '@skyra/env-utilities' {
	interface Env {
		DISCORD_TOKEN: string;
		DEBUG_GUILD: string;
	}
}

/**
 * Container Typing
 */
declare module '@sapphire/pieces' {
	interface Container {
		isDevelopment: boolean;
		db: PrismaClient<Prisma.PrismaClientOptions, 'info' | 'warn' | 'error'>;
		startTime: Dayjs;
	}
}
