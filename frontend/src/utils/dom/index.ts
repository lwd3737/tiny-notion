import { updateBlockContent } from "operations/mutations";

export const getBlockElById = (id: string) => {
	return document.querySelector(`.block[data-block-id="${id}"]`);
};

export const getBlockContentEditableLeafById = (id: string) => {
	const $block = getBlockElById(id);

	if ($block === null) return null;

	const $contentEditablLeaf = $block.querySelector(
		'[data-content-editable-leaf="true"]',
	);

	if ($contentEditablLeaf === null) return null;

	return $contentEditablLeaf as HTMLElement;
};

export const updateContentEditableEl = (id: string, content: any) => {
	const $contentEditableLeaf = getBlockContentEditableLeafById(id);

	if ($contentEditableLeaf === null) return;

	$contentEditableLeaf.innerHTML = content;
};

export const updateBlockContentById = (id: string) => {
	const $contentEditableLeaf = getBlockContentEditableLeafById(id);

	if (!$contentEditableLeaf) return;

	const content = $contentEditableLeaf.innerHTML;

	updateBlockContent({
		id: id,
		content,
	});
};

export const extractContentsAfterCusor = (id: string) => {
	const $contentEditableLeaf = getBlockContentEditableLeafById(id);

	if (!$contentEditableLeaf) return;

	const selection = document.getSelection();

	if (!selection) return;

	selection.extend(
		$contentEditableLeaf,
		$contentEditableLeaf.childNodes.length,
	);

	const range = selection.getRangeAt(0);
	const $content = range.extractContents().firstChild as Node;
	let content;

	if ($content && $content.nodeType === Node.TEXT_NODE) {
		const $textNode = $content as Text;

		content = $textNode.data;
	}

	return content;
};
