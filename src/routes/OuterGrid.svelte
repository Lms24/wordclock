<script lang="ts">
	import type { MinutePosition } from '$lib/types';
	import { onDestroy } from 'svelte';
	import MinuteCell from './MinuteCell.svelte';
	import { currentTime } from '$lib/stores/time';
	import LetterGrid from './LetterGrid.svelte';

	const activeMinuteCell: Record<MinutePosition, boolean> = {
		tl: false,
		tr: false,
		br: false,
		bl: false,
	};

	const unsub = currentTime.subscribe((time) => {
		Object.keys(activeMinuteCell).forEach((position, index) => {
			const minute = time.getMinutes();
			activeMinuteCell[position as MinutePosition] = minute % 5 >= index + 1;
		});
	});

	onDestroy(() => {
		unsub();
	});
</script>

<div class="container">
	<MinuteCell position="tl" active={activeMinuteCell['tl']} />
	<MinuteCell position="tr" active={activeMinuteCell['tr']} />
	<LetterGrid />
	<MinuteCell position="bl" active={activeMinuteCell['bl']} />
	<MinuteCell position="br" active={activeMinuteCell['br']} />
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: min(12vw, 12vh) auto min(12vw, 12vh);
		grid-template-rows: min(12vw, 12vh) auto min(12vw, 12vh);
		grid-gap: 0;
		height: 100%;
		width: 100%;
		border: 1px solid grey;
		margin: 1px;
	}
	:global(.on) {
		color: white;
	}
	:global(.off) {
		color: rgb(31, 31, 31);
	}
</style>
