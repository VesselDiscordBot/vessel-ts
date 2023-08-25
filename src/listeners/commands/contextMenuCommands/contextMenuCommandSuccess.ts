import { formatDate } from '#lib/utils';
import { Listener, LogLevel, type ContextMenuCommandSuccessPayload } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { cyan } from 'colorette';
import { ApplicationCommandType } from 'discord.js';

export class UserListener extends Listener {
	public run(payload: ContextMenuCommandSuccessPayload) {
		const { command, interaction } = payload;
		const type = (type: ApplicationCommandType) => (type === ApplicationCommandType.User ? 'user' : 'message');

		interaction.commandType;
		const date = formatDate(interaction.createdTimestamp);
		const author = `${interaction.user.username}[${cyan(interaction.user.id)}]`;
		const name = cyan(command.name);

		this.container.logger.info(`[${date}] ${author} issued ${type(interaction.commandType)} ctx command ${name}`);
	}

	public onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Info;
		return super.onLoad();
	}
}
