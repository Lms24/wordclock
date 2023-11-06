export type Words =
	| 'it'
	| 'is'
	| 'five'
	| 'ten'
	| 'twenty'
	| 'threequarter'
	| 'quarter'
	| 'to'
	| 'past'
	| 'half'
	| 'five-lower'
	| 'one'
	| 'two'
	| 'three'
	| 'four'
	| 'six'
	| 'eight'
	| 'seven'
	| 'twelve'
	| 'ten-lower'
	| 'nine'
	| 'eleven'
	| 'oclock';

export type Letter = {
	text: string;
	words: Words[] | null;
	active: boolean;
};

export type LetterGrid<W> = (string | [string, Words] | [string, W[]])[][];

export type Clock<W extends string = Words> = {
	letterGrid: LetterGrid<W>;
	getActiveWords: (time: Date) => Record<W, boolean>;
};
