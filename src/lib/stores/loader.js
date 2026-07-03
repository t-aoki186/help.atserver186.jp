import { writable } from 'svelte/store';

export const isVisible = writable(false);
export const hasInitialized = writable(false); //アクセスが初回かを判定するためのフラグ