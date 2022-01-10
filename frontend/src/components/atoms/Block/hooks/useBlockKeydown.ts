import { v4 as uuid } from "uuid";
import { IBlockType, ISection } from "generated/graphql";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";
import {
	addBlock,
	deleteBlock,
	setFocusedBlock,
	setFocusedSection,
	updateBlockContent,
} from "operations/mutations";
import { KeyboardEvent, useCallback } from "react";
import {
	extractContentsAfterCusor,
	getContentEditableContent,
	getEndOfContentEditableLeaf,
	isCursorPosAtFirst,
	placeCursorAtEndOfContentEditable,
	placeCursorAtOffsetOfContentEditable,
} from "utils/dom";
import { TextInputElement } from "components/atoms/TextInput";
import { sanitizeHTML } from "components/atoms/TextInput/utils";

export const useBlockKeyDown = ({
	focusedBlock,
	blocksMeta,
	blocksContent,
}: {
	focusedBlock: FocusedBlock;
	blocksMeta: BlocksMeta;
	blocksContent: BlocksContent;
}) => {
	const onBlockTextInput = useCallback(
		(e: KeyboardEvent) => {
			if (!focusedBlock) return;
			const target = e.target as TextInputElement;
			const html = sanitizeHTML(target.innerHTML);

			updateBlockContent({
				id: focusedBlock.id,
				content: html,
			});
		},
		[focusedBlock],
	);

	const onBlockEnterKeyDown = useCallback(
		(e: KeyboardEvent) => {
			/*
				This event is aplied to DOM at first, then it is passed to react state
			*/
			//prevent creating div, br tag from dom
			e.preventDefault();

			if (!focusedBlock) return;
			if (!blocksMeta) return;
			if (!blocksContent) return;

			const createNextBlockThenUpdateContent = () => {
				const blockMeta = blocksMeta[focusedBlock.index];
				const extractedContent = extractContentsAfterCusor(blockMeta.id);

				if (extractedContent) {
					const focusedContent = getContentEditableContent(focusedBlock.id);

					updateBlockContent({
						id: focusedBlock.id,
						content: focusedContent,
					});
				}

				addBlock({
					id: uuid(),
					index: focusedBlock.index + 1,
					type: IBlockType.Text,
					content: {
						value: extractedContent ?? "",
					},
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

			const updatePrevBlockContent = (prevId: string, newContent: string) => {
				const prevContent = blocksContent[prevId].content;
				const prevContentEditableEnd = getEndOfContentEditableLeaf(prevId);

				if (!prevContentEditableEnd) return;

				//updateContentEditableEl(prevId, prevContent + newContent);
				updateBlockContent({
					id: prevId,
					content: prevContent + newContent,
				});

				placeCursorAtOffsetOfContentEditable(
					prevContentEditableEnd.node,
					prevContentEditableEnd.offset,
				);
			};

			if (isCursorPosAtFirst()) {
				const prevIndex = focusedBlock.index - 1;

				if (prevIndex < 0) return;

				const prevBlockMeta = blocksMeta[prevIndex];
				const prevId = prevBlockMeta.id;
				const extractedContent = extractContentsAfterCusor(focusedBlock.id);

				deleteBlock(focusedBlock);

				if (extractedContent) {
					updatePrevBlockContent(prevId, extractedContent);
				} else {
					placeCursorAtEndOfContentEditable(prevId);
				}
			} else {
				onBlockTextInput(e);
			}
		},
		[blocksContent, blocksMeta, focusedBlock, onBlockTextInput],
	);

	const onBlockArrowDownKeyDown = useCallback(() => {
		if (!blocksMeta) return;
		if (!focusedBlock) return;

		const nextFocusedIndex = focusedBlock.index + 1;

		if (nextFocusedIndex >= blocksMeta.length) return;

		const nextFocusedBlock = blocksMeta[nextFocusedIndex];

		if (!nextFocusedBlock) {
			console.error("next block not exist");

			return;
		}

		setFocusedBlock({
			id: nextFocusedBlock.id,
			index: nextFocusedIndex,
		});
	}, [blocksMeta, focusedBlock]);

	const onBlockArrowUpKeyDown = useCallback(() => {
		if (!focusedBlock) return;
		if (!blocksMeta) return;

		const prevIndex = focusedBlock.index - 1;

		if (prevIndex < 0) {
			setFocusedBlock(null);
			setFocusedSection(ISection.Title);

			return;
		}

		const prevBlock = blocksMeta[prevIndex];

		if (!prevBlock) {
			console.error("prev block not exist");

			return;
		}

		setFocusedBlock({ id: prevBlock.id, index: prevIndex });
	}, [blocksMeta, focusedBlock]);

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
				case "ArrowDown": {
					onBlockArrowDownKeyDown();
					break;
				}
				case "ArrowUp": {
					onBlockArrowUpKeyDown();
					break;
				}
				default:
					onBlockTextInput(e);
			}
		},
		[
			onBlockEnterKeyDown,
			onBlockBackspaceKeyDown,
			onBlockTextInput,
			onBlockArrowDownKeyDown,
			onBlockArrowUpKeyDown,
		],
	);

	return onBlockKeyDown;
};
