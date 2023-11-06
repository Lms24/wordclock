import type { Clock, Words } from './types';

export const de: () => Clock = () => ({
	letterGrid: [
		[
			['E', 'it'],
			['S', 'it'],
			'X',
			['I', 'is'],
			['S', 'is'],
			['T', 'is'],
			'A',
			['F', 'five'],
			['Ü', 'five'],
			['N', 'five'],
			['F', 'five'],
		],
		[
			['Z', 'ten'],
			['E', 'ten'],
			['H', 'ten'],
			['N', 'ten'],
			['Z', 'twenty'],
			['W', 'twenty'],
			['A', 'twenty'],
			['N', 'twenty'],
			['Z', 'twenty'],
			['I', 'twenty'],
			['G', 'twenty'],
		],
		[
			['D', 'threequarter'],
			['R', 'threequarter'],
			['E', 'threequarter'],
			['I', 'threequarter'],
			['V', ['quarter', 'threequarter']],
			['I', ['quarter', 'threequarter']],
			['E', ['quarter', 'threequarter']],
			['R', ['quarter', 'threequarter']],
			['T', ['quarter', 'threequarter']],
			['E', ['quarter', 'threequarter']],
			['L', ['quarter', 'threequarter']],
		],
		[
			['V', 'to'],
			['O', 'to'],
			['R', 'to'],
			'F',
			'U',
			'N',
			'K',
			['N', 'past'],
			['A', 'past'],
			['C', 'past'],
			['H', 'past'],
		],
		[
			['H', 'half'],
			['A', 'half'],
			['L', 'half'],
			['B', 'half'],
			'A',
			['E', 'eleven'],
			['L', 'eleven'],
			['F', ['eleven', 'five-lower']],
			['Ü', 'five-lower'],
			['N', 'five-lower'],
			['F', 'five-lower'],
		],
		[
			['E', 'one'],
			['I', 'one'],
			['N', 'one'],
			['S', 'one'],
			'X',
			'A',
			'M',
			['Z', 'two'],
			['W', 'two'],
			['E', 'two'],
			['I', 'two'],
		],
		[
			['D', 'three'],
			['R', 'three'],
			['E', 'three'],
			['I', 'three'],
			'P',
			'M',
			'J',
			['V', 'four'],
			['I', 'four'],
			['E', 'four'],
			['R', 'four'],
		],
		[
			['S', 'six'],
			['E', 'six'],
			['C', 'six'],
			['H', 'six'],
			['S', 'six'],
			'N',
			'L',
			['A', 'eight'],
			['C', 'eight'],
			['H', 'eight'],
			['T', 'eight'],
		],
		[
			['S', 'seven'],
			['I', 'seven'],
			['E', 'seven'],
			['B', 'seven'],
			['E', 'seven'],
			['N', 'seven'],
			['Z', 'twelve'],
			['W', 'twelve'],
			['Ö', 'twelve'],
			['L', 'twelve'],
			['F', 'twelve'],
		],
		[
			['Z', 'ten-lower'],
			['E', 'ten-lower'],
			['H', 'ten-lower'],
			['N', ['ten-lower', 'nine']],
			['E', 'nine'],
			['U', 'nine'],
			['N', 'nine'],
			'K',
			['U', 'oclock'],
			['H', 'oclock'],
			['R', 'oclock'],
		],
	],

	getActiveWords: (time) => {
		const minutes = time.getMinutes();
		const hours = time.getHours() % 12;

		const itIs: Partial<Record<Words, boolean>> = {
			it: true,
			is: true,
		};

		const minuteWords: Partial<Record<Words, boolean>> =
			minutes >= 5 && minutes < 10
				? { five: true, past: true }
				: minutes >= 10 && minutes < 15
				? { ten: true, past: true }
				: minutes >= 15 && minutes < 20
				? { quarter: true, past: true }
				: minutes >= 20 && minutes < 25
				? { twenty: true, past: true }
				: minutes >= 25 && minutes < 30
				? { five: true, to: true, half: true }
				: minutes >= 30 && minutes < 35
				? { half: true }
				: minutes >= 35 && minutes < 40
				? { five: true, past: true, half: true }
				: minutes >= 40 && minutes < 45
				? { twenty: true, to: true }
				: minutes >= 45 && minutes < 50
				? { threequarter: true }
				: minutes >= 50 && minutes < 55
				? { ten: true, to: true }
				: minutes >= 55 && minutes < 60
				? { five: true, to: true }
				: {};

		const hourWords: Partial<Record<Words, boolean>> = {
			one: (hours === 0 && minutes >= 25) || (hours === 1 && minutes < 25),
			two: (hours === 1 && minutes >= 25) || (hours === 2 && minutes < 25),
			three: (hours === 2 && minutes >= 25) || (hours === 3 && minutes < 25),
			four: (hours === 3 && minutes >= 25) || (hours === 4 && minutes < 25),
			'five-lower': (hours === 4 && minutes >= 25) || (hours === 5 && minutes < 25),
			six: (hours === 5 && minutes >= 25) || (hours === 6 && minutes < 25),
			seven: (hours === 6 && minutes >= 25) || (hours === 7 && minutes < 25),
			eight: (hours === 7 && minutes >= 25) || (hours === 8 && minutes < 25),
			nine: (hours === 8 && minutes >= 25) || (hours === 9 && minutes < 25),
			'ten-lower': (hours === 9 && minutes >= 25) || (hours === 10 && minutes < 25),
			eleven: (hours === 10 && minutes >= 25) || (hours === 11 && minutes < 25),
			twelve: (hours === 11 && minutes >= 25) || (hours === 0 && minutes < 25),
		};

		const activeWords = {
			...itIs,
			...minuteWords,
			...hourWords,
			oclock: minutes >= 0 && minutes < 5,
		};

		const sentence = (Object.keys(activeWords) as Words[])
			.filter((w) => !!activeWords[w])
			.join(' ');

		console.log(sentence, { hours, minutes, time });
		return activeWords as Record<Words, boolean>;
	},
});
