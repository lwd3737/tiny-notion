export const setCursorPosition = (node: HTMLElement) => {
	const selection = document.getSelection();

	if (selection === null) return;

	selection.collapse(node, node.childNodes.length);
};

export const sanitizeHTML = (html: string) => {
	return html.replace(/<div>|<\/div>|<br>/g, "").replace(/&nbsp;/, " ");
};
