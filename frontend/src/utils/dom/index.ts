import { updateBlockContent } from "operations/mutations";

export const getBlockElById = (id: string): Element | null => {
	return document.querySelector(`.block[data-block-id="${id}"]`);
};

export const getBlockContentEditableLeafById = (
	id: string,
): HTMLElement | null => {
	const $block = getBlockElById(id);

	if ($block === null) return null;

	const $contentEditablLeaf = $block.querySelector(
		'[data-content-editable-leaf="true"]',
	);

	if ($contentEditablLeaf === null) return null;

	return $contentEditablLeaf as HTMLElement;
};

export const updateContentEditableEl = (id: string, content: any): void => {
	const $contentEditableLeaf = getBlockContentEditableLeafById(id);

	if ($contentEditableLeaf === null) return;

	$contentEditableLeaf.innerHTML = content;
};

export const getContentEditableContent = (id: string): string | null => {
	const $contentEditableLeaf = getBlockContentEditableLeafById(id);

	if (!$contentEditableLeaf) return null;

	return $contentEditableLeaf.innerHTML;
};

export const getRange = (): Range | null => {
	const selection = document.getSelection();

	if (!selection) return null;

	return selection.getRangeAt(0) ?? null;
};

export const extractContentsAfterCusor = (id: string): string | null => {
	const $contentEditableLeaf = getBlockContentEditableLeafById(id);

	if (!$contentEditableLeaf) return null;

	const selection = document.getSelection();

	if (!selection) return null;

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

	return content ?? null;
};

export const searchEndNode = (node: Text | HTMLElement): Text | null => {
	if (node.nodeType === Node.TEXT_NODE) {
		return node as Text;
	} else if (node.nodeType === Node.ELEMENT_NODE) {
		const $el = node as HTMLElement;

		return searchEndNode($el.lastChild as Text | HTMLElement);
	}

	return null;
};

export const getEndOfContentEditableLeaf = (
	id: string,
): { node: Text | HTMLElement; offset: number } | null => {
	const $contentEditableLeaf = getBlockContentEditableLeafById(id);

	if (!$contentEditableLeaf) return null;

	//TODO 마지막 노드가 엘리먼트 노드일 때 offset 추가
	const focusNode = $contentEditableLeaf.lastChild as Text | HTMLElement;

	if (!focusNode) return null;

	const $textNode = searchEndNode(focusNode);

	if (!$textNode) return null;

	return {
		node: $textNode,
		offset: $textNode.data.length,
	};
};

export const placeCursorAtOffsetOfContentEditable = (
	node: Node,
	offset: number,
): void => {
	const selection = document.getSelection();

	if (!selection) return;

	selection.setPosition(node, offset);
};

export const placeCursorAtEndOfContentEditable = (id: string): void => {
	const $contentEdtitableLeafEl = getBlockContentEditableLeafById(id);

	if (!$contentEdtitableLeafEl) return;

	const range = getRange();

	if (!range) return;

	range.setEnd(
		$contentEdtitableLeafEl,
		$contentEdtitableLeafEl?.childNodes.length,
	);
};

export const isCursorPosAtFirst = (): boolean => {
	const selection = document.getSelection();

	if (!selection) return false;
	if (!selection.isCollapsed) return false;

	return selection.anchorOffset === 0 ? true : false;
};
