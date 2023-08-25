import type { CommandOptions } from '#lib/interfaces';
import { SlashCommand } from '#lib/structures';
import { ApplyOptions } from '@sapphire/decorators';
import { ApplicationCommandRegistry } from '@sapphire/framework';
import { type ChatInputCommandInteraction, Team, bold, time, TimestampStyles, hyperlink } from 'discord.js';
import { defaultRegisterOptions, rootDir } from '#lib/constants';
import { inlineCodeBlock } from '@sapphire/utilities';
import dayjs from 'dayjs';
import { stripIndent } from 'common-tags';
import { createEmbed, npmUrl } from '#lib/utils';
import { readFileSync } from 'fs';

@ApplyOptions<CommandOptions>({
	description: 'Get info about the bot'
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
		const owner = i.client.application.owner;
		const devList =
			owner instanceof Team
				? owner.members
						.map((x) => x.user.tag)
						.map((x) => inlineCodeBlock(x))
						.join(', ')
				: owner?.tag;
		const commandCount = this.store.size;

		// var desc = ``
		// {"Developer".Pluralise(devList.Count).Bold()}: {string.Join(", ", devList)}
		// {"Uptime".Bold()}: {uptime.Humanize()}
		// {"Command Count".Bold()}: {commandCount:N0}
		// {"Versions".Bold()}:
		// - DSharpPlus {dspVer}
		// - DSharpPlus.SlashCommands: {slashVer}
		// - Latest Commit: {commit.Truncate(8, "").InlineCode().MaskedLink(_bot.LatestCommitLink)}
		// ``

		var packageJsonContents = readFileSync(rootDir + '/package.json').toString();
		var packageJson = JSON.parse(packageJsonContents) as any; // yes i used an any, sue me

		const dependencies = packageJson.dependencies;
		const desc = stripIndent`
		${bold('Developer')}: ${devList}
		${bold('Uptime')}: ${time(dayjs(this.container.startTime).toDate(), TimestampStyles.RelativeTime)}
		- ${bold('Dependencies')}:
		 - ${hyperlink('@sapphire/framework', npmUrl('@sapphire/framework'))}: ${dependencies['@sapphire/framework']}
		 - ${hyperlink('discord.js', npmUrl('discord.js'))}: ${dependencies['discord.js']}
		- ${bold('Statistics')}:
		 - ${bold('Command Count')}: ${commandCount}
		`;

		var embed = createEmbed(i.user).setTitle('About').setDescription(desc);

		await i.reply({ embeds: [embed] });
	}
}
