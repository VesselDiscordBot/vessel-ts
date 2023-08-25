import { SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';

export class VesselClient extends SapphireClient {
	constructor(opts: ClientOptions) {
		super(opts);
	}
}
