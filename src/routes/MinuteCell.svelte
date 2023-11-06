<script lang="ts">
	import type { MinutePosition } from '$lib/types';

	export let position: MinutePosition;
	export let active: boolean;
</script>

<div class="item-minute minute-{position}">
	<span class={active ? 'on' : 'off'}>•</span>
</div>

<style>
	.item-minute {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: min(2vw, 2vh);
		font-weight: bold;
		width: 100%;
		height: 100%;
	}

	.minute-tr {
		grid-column: 3;
	}

	.minute-bl {
		grid-row: 3;
	}

	.minute-br {
		grid-row: 3;
		grid-column: 3;
	}
</style>
