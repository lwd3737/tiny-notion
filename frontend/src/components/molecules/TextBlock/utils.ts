export const getBlockElById = (id: string) => {
	return document.querySelector(`.block[data-block-id="${id}"]`);
};

export const getBlockContentEditableLeafById = (id: string) => {
	const $el = getBlockElById(id);

	if ($el === null) return null;

	const $block = getBlockElById(id);

	if ($block === null) return null;

	const $contentEditablLeaf = $block.querySelector(
		'[data-content-editable-leaf="true"]',
	);

	if ($contentEditablLeaf === null) return null;

	return $contentEditablLeaf as HTMLElement;
};
