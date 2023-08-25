import type { Nullish } from '@sapphire/utilities';
import dayjs, { Dayjs } from 'dayjs';
import { EmbedBuilder, GuildMember, User } from 'discord.js';

export const formatDate = (date: string | number | Dayjs | Date | Nullish, withSeconds = false) =>
	dayjs(date).format(withSeconds ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY HH:mm');

export const npmUrl = <Url extends string>(project: Url): `https://www.npmjs.com/package/${Url}` => `https://www.npmjs.com/package/${project}`;

export const createEmbed = (memberOrUser: GuildMember | User) => {
	const tag = memberOrUser instanceof User ? memberOrUser.tag : memberOrUser.user.tag;

	return new EmbedBuilder().setTitle(tag).setColor('#0099BB');
};
