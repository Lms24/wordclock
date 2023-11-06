import type { Readable } from 'svelte/motion';
import { writable } from 'svelte/store';

export const currentTime = createTimeStore();

function createTimeStore(): Readable<Date> {
	const { subscribe, set } = writable(new Date());

	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	const subscribeWithCliearInterval = ((cb) => {
		const unsub = subscribe(cb);
		return () => {
			unsub();
			clearInterval(interval);
		};
	}) satisfies Readable<Date>['subscribe'];

	return {
		subscribe: subscribeWithCliearInterval
	};
}
