import './lib/setup';
import { LogLevel, container } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { VesselClient } from '#lib/structures';
import { PrismaClient } from '@prisma/client';

const client = new VesselClient({
	caseInsensitiveCommands: true,
	logger: {
		level: container.isDevelopment ? LogLevel.Debug : LogLevel.Info
	},
	intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
	loadMessageCommandListeners: true
});

const main = async () => {
	container.db = new PrismaClient({
		log: [
			{ emit: 'event', level: 'error' },
			{ emit: 'event', level: 'warn' }
		]
	});
	container.db.$on('error', (e) => console.error(e.message));
	container.db.$on('warn', (e) => console.warn(e.message));

	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
		await container.db.$connect();
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

void main();
