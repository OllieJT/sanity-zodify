export function capitalize(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function handleTitle(title: string) {
	return title
		.split(' ')
		.map((str) => capitalize(str.toLowerCase()))
		.join('');
}
