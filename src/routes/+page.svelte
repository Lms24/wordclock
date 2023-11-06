<script lang="ts">
	import OuterGrid from './OuterGrid.svelte';
</script>

<main>
	<div class="gridContainer">
		<OuterGrid />
	</div>
</main>

<style>
	main {
		background-color: black;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		color: white;
	}
	.gridContainer {
		width: min(calc(100vh - 5px), calc(100vw - 5px));
		height: min(calc(100vh - 5px), calc(100vw - 5px));
	}
</style>
