import { Listener, LogLevel, type ChatInputCommandSuccessPayload } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { formatDate } from '#lib/utils';
import { cyan } from 'colorette';

export class UserListener extends Listener {
	public run(payload: ChatInputCommandSuccessPayload) {
		const { command, interaction } = payload;
		const date = formatDate(interaction.createdTimestamp);
		const author = `${interaction.user.username}[${cyan(interaction.user.id)}]`;
		const name = cyan(command.name);

		this.container.logger.info(`[${date}] ${author} issued slash command ${name}`);
	}

	public onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Info;
		return super.onLoad();
	}
}
