export function capitalize(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function handleTitle(title: string) {
	return title.split(' ').map(capitalize).join('');
}
