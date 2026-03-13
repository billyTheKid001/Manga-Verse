import { writable } from 'svelte/store';

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : 'dark';
export const theme = writable(stored || 'dark');

theme.subscribe(val => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('theme', val);
});
