import { IBlockType } from "generated/graphql";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";
import {
	addBlock,
	deleteBlock,
	updateBlockContent,
} from "operations/mutations";
import { KeyboardEvent, useCallback } from "react";
import {
	extractContentsAfterCusor,
	updateBlockContentFromEl,
	updateBothBlockContentElAndState,
	updateContentEditableEl,
} from "utils/dom";
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
			e.preventDefault();

			if (!focusedBlock) return;
			if (!blocksMeta) return;
			if (!blocksContent) return;

			const createNextBlockThenUpdateContent = () => {
				const blockMeta = blocksMeta[focusedBlock.index];

				const content = extractContentsAfterCusor(blockMeta.id) ?? "";

				addBlock({
					id: uuid(),
					type: IBlockType.Text,
					content,
					index: focusedBlock.index + 1,
				});
			};

			createNextBlockThenUpdateContent();
		},
		[focusedBlock, blocksMeta, blocksContent],
	);

	const onBlockBackspaceKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!blocksMeta) return;
			if (!blocksContent) return;
			if (!focusedBlock) return;

			const isCursorPosAtFirst = () => {
				const selection = document.getSelection();

				if (!selection) return false;
				if (!selection.isCollapsed) return false;

				return selection.anchorOffset === 0 ? true : false;
			};

			const updatePrevBlockContent = (newContent: any) => {
				const prevIndex = focusedBlock.index - 1;

				if (prevIndex < 0) {
				} else {
					const prevBlockMeta = blocksMeta[prevIndex];
					const prevContent = blocksContent[prevBlockMeta.id];
					const content = prevContent.content + newContent;

					deleteBlock(focusedBlock);
					updateBothBlockContentElAndState(prevBlockMeta.id, content);
				}
			};

			if (isCursorPosAtFirst()) {
				const content = extractContentsAfterCusor(focusedBlock.id);

				if (content) {
					updatePrevBlockContent(content);
				}
			}
		},
		[blocksContent, blocksMeta, focusedBlock],
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
				case "Backspace": {
					onBlockBackspaceKeyDown(e);
					break;
				}
			}
		},
		[onBlockEnterKeyDown, onBlockBackspaceKeyDown],
	);

	return onBlockKeyDown;
};
