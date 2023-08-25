import { container, type ApplicationCommandRegistry } from '@sapphire/framework';
import { envParseString } from '@skyra/env-utilities';
import { join } from 'path';

export const rootDir = join(__dirname, '..', '..');
export const srcDir = join(rootDir, 'src');

export const defaultRegisterOptions: ApplicationCommandRegistry.RegisterOptions = {
	guildIds: container.isDevelopment ? [envParseString('DEBUG_GUILD')] : []
};
