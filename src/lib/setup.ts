import './types';
// import '@total-typescript/ts-reset';
// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import { ApplicationCommandRegistries, RegisterBehavior, container } from '@sapphire/framework';
import { envParseString, setup } from '@skyra/env-utilities';
import * as colorette from 'colorette';
import { join } from 'node:path';
import { rootDir } from './constants';

// import sapphire utils
import '@sapphire/plugin-logger/register';
import '@kaname-png/plugin-subcommands-advanced/register';

// Set default behavior to bulk overwrite
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

// Read env var
setup({ path: join(rootDir, '.env') });

// Enable colorette
colorette.createColors({ useColor: true });

container.isDevelopment = envParseString('NODE_ENV') === 'development';
