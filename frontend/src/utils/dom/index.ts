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
