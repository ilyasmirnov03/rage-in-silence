import { writable } from "svelte/store";

export const isOpen = writable(false);

export const audio = writable({});

export const percentage = writable();

export const percentageCap = writable(20);