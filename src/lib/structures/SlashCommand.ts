import { Command, type PieceContext } from '@sapphire/framework';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { CommandOptions } from '#lib/interfaces';

export abstract class SlashCommand extends Command {
	public constructor(ctx: PieceContext, opts: CommandOptions) {
		super(ctx, opts);
	}

	public abstract chatInputRun(i: ChatInputCommandInteraction): Promise<void>;

	protected parseConstructorPreConditions(options: CommandOptions): void {
		this.parseConstructorPreConditionsRunIn(options);
		this.parseConstructorPreConditionsNsfw(options);
		this.parseConstructorPreConditionsRequiredClientPermissions(options);
		this.parseConstructorPreConditionsRequiredUserPermissions(options);
	}
}
