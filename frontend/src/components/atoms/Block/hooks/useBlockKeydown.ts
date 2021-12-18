import { IBlockType } from "generated/graphql";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";
import { addBlock, updateBlockContent } from "operations/mutations";
import { KeyboardEvent, useCallback } from "react";
import { getBlockContentEditableLeafById } from "utils/dom";
import { v4 as uuid } from "uuid";

export const useBlockKeyDown = ({
	focusedBlock,
	blocksMeta,
	blocksContent,
}: {
	focusedBlock: FocusedBlock;
	blocksMeta: BlocksMeta;
	blocksContent: BlocksContent;
}) => {
	const onBlockEnterKeyDown = useCallback(
		(e: KeyboardEvent) => {
			/*
				This event is aplied to DOM at first, then it is passed to react state
			*/
			if (!focusedBlock) return;
			if (!blocksMeta) return;
			if (!blocksContent) return;

			const updateFocusedBlockContent = ($el: HTMLElement | null) => {
				if (!$el) return;

				const content = $el.innerHTML;

				updateBlockContent({
					id: blockMeta.id,
					content,
				});
			};

			const createNextBlockThenUpdateContent = ($el: HTMLElement | null) => {
				if (!$el) return;

				const selection = document.getSelection();

				if (!selection) return;

				selection.extend($el, $el.childNodes.length);

				const range = selection.getRangeAt(0);
				const $content = range.extractContents().firstChild as Node;
				let content;

				if ($content && $content.nodeType === Node.TEXT_NODE) {
					const $textNode = $content as Text;
					content = $textNode.data;
				}

				addBlock({
					id: uuid(),
					type: IBlockType.Text,
					content,
					index: focusedBlock.index + 1,
				});
			};

			const blockMeta = blocksMeta[focusedBlock.index];
			const $contentEditableLeaf = getBlockContentEditableLeafById(
				blockMeta.id,
			);

			updateFocusedBlockContent($contentEditableLeaf);
			createNextBlockThenUpdateContent($contentEditableLeaf);
		},
		[focusedBlock, blocksMeta, blocksContent],
	);

	const onBlockKeyDown = useCallback(
		/*
      keydown event is fired before keyup event
			and fired before forn control input
    */
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter":
					onBlockEnterKeyDown(e);
					break;
			}
		},
		[onBlockEnterKeyDown],
	);

	return onBlockKeyDown;
};
