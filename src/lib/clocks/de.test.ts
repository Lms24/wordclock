import { describe, expect, it } from 'vitest';
import { de } from './de';

describe('german clock face', () => {
	describe('getActiveWords', () => {
		it.each([
			['00:00', ['it', 'is', 'twelve', 'oclock']],
			['01:04', ['it', 'is', 'one', 'oclock']],
			['02:05', ['it', 'is', 'five', 'past', 'two']],
			['03:09', ['it', 'is', 'five', 'past', 'three']],
			['04:10', ['it', 'is', 'ten', 'past', 'four']],
			['05:14', ['it', 'is', 'ten', 'past', 'five-lower']],
			['06:15', ['it', 'is', 'quarter', 'past', 'six']],
			['07:19', ['it', 'is', 'quarter', 'past', 'seven']],
			['08:20', ['it', 'is', 'twenty', 'past', 'eight']],
			['09:24', ['it', 'is', 'twenty', 'past', 'nine']],
			['09:25', ['it', 'is', 'five', 'to', 'half', 'ten-lower']],
			['10:29', ['it', 'is', 'five', 'to', 'half', 'eleven']],
			['11:30', ['it', 'is', 'half', 'twelve']],
			['12:34', ['it', 'is', 'half', 'one']],
			['13:35', ['it', 'is', 'five', 'past', 'half', 'two']],
			['14:39', ['it', 'is', 'five', 'past', 'half', 'three']],
			['15:40', ['it', 'is', 'twenty', 'to', 'four']],
			['16:44', ['it', 'is', 'twenty', 'to', 'five-lower']],
			['17:45', ['it', 'is', 'threequarter', 'six']],
			['18:49', ['it', 'is', 'threequarter', 'seven']],
			['19:50', ['it', 'is', 'ten', 'to', 'eight']],
			['20:54', ['it', 'is', 'ten', 'to', 'nine']],
			['21:55', ['it', 'is', 'five', 'to', 'ten-lower']],
			['22:59', ['it', 'is', 'five', 'to', 'eleven']],
			['23:59', ['it', 'is', 'five', 'to', 'twelve']],
		])('returns the correct words for the given time (%s)', (time, expectedWords) => {
			const t = new Date();

			const [hour, minute] = time.split(':').map((s) => Number(s));

			t.setHours(hour);
			t.setMinutes(minute);
			const activeWords = de().getActiveWords(t);
			const receivedWords = Object.keys(activeWords).filter((w) => !!activeWords[w]);

			console.log(receivedWords);

			expect(receivedWords).toStrictEqual(expectedWords);
		});
	});
});
