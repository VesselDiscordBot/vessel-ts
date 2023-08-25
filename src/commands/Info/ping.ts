import type { CommandOptions } from '#lib/interfaces';
import { SlashCommand } from '#lib/structures';
import { createEmbed } from '#lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { ApplicationCommandRegistry } from '@sapphire/framework';
import dayjs from 'dayjs';
import { codeBlock, type ChatInputCommandInteraction } from 'discord.js';
import { defaultRegisterOptions } from '#lib/constants';

@ApplyOptions<CommandOptions>({
	description: 'ping pong'
})
export class UserCommand extends SlashCommand {
	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			{
				name: this.name,
				description: this.description
			},
			defaultRegisterOptions
		);
	}

	public async chatInputRun(i: ChatInputCommandInteraction) {
		const ws = this.container.client.ws.ping;

		const rest1 = dayjs();
		await i.reply('Pinging...');
		const rest2 = dayjs();
		const restDiff = dayjs(rest2).diff(rest1);

		const db1 = dayjs();
		await this.container.db.$queryRaw`SELECT 1`;
		const db2 = dayjs();
		const dbDiff = dayjs(db2).diff(db1);

		const embed = createEmbed(i.user).addFields([
			{
				name: 'WebSocket',
				value: `${codeBlock(`${ws.toLocaleString()}ms`)}`,
				inline: true
			},
			{
				name: 'REST',
				value: `${codeBlock(`${restDiff}ms`)}`,
				inline: true
			},
			{
				name: 'Database',
				value: `${codeBlock(`${dbDiff}ms`)}`,
				inline: true
			}
		]);

		await i.editReply({ embeds: [embed], content: null });
	}
}
