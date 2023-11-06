<script lang="ts">
	import { de } from '$lib/clocks/de';
	import type { Letter } from '$lib/clocks/types';
	import { currentTime } from '$lib/stores/time';
	import { onDestroy } from 'svelte';
	import { derived } from 'svelte/store';

	const germanClockFace = de();

	let letters: Letter[] = [];

	const activeWords$ = derived(currentTime, ($time) => {
		return germanClockFace.getActiveWords($time);
	});

	const unsub = activeWords$.subscribe((activeWords) => {
		function isActive(words: Letter['words']): boolean {
			if (!words) {
				return false;
			}
			return words.some((word) => activeWords[word] === true);
		}

		letters = germanClockFace.letterGrid.flat().map((l) => {
			if (Array.isArray(l)) {
				const words = Array.isArray(l[1]) ? l[1] : [l[1]];
				return {
					text: l[0],
					words,
					active: isActive(words),
				};
			}
			return {
				text: l,
				words: null,
				active: false,
			};
		});
	});

	onDestroy(() => {
		unsub();
	});
</script>

<div class="container">
	{#each letters as letter}
		<div class="letterContainer {letter.active ? 'on' : 'off'}">{letter.text}</div>
	{/each}
</div>

<style>
	.container {
		grid-column: 2;
		grid-row: 2;
		display: grid;
		grid-template-columns: repeat(11, 1fr);
		grid-template-rows: repeat(10, 1fr);
		border: 1pO solid grey;
	}

	.letterContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: min(4vw, 4vh);
		font-weight: 100;
		width: 100%;
		height: 100%;
	}
</style>
