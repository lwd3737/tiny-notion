import { KeyboardEvent, useCallback } from "react";
import { IBlockType, ISection } from "generated/graphql";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";
import {
	updateBlockContent,
	deleteBlock,
	setFocusedBlock,
	setFocusedSection,
} from "operations/mutations";
import { TextInputElement } from "components/atoms/TextInput";
import { sanitizeHTML } from "components/atoms/TextInput/utils";
import { getBlockContentEditableLeafById } from "utils/dom";
import { of } from "zen-observable";

export const useBlockKeyUp = ({
	blocksMeta,
	blocksContent,
	focusedBlock,
}: {
	blocksMeta: BlocksMeta | null;
	blocksContent: BlocksContent | null;
	focusedBlock: FocusedBlock | null;
}) => {
	const onTextBlockInput = useCallback(
		(e: KeyboardEvent) => {
			if (!blocksMeta) return;
			if (!blocksContent) return;
			if (!focusedBlock) return;

			const $el = e.target as TextInputElement;
			const html = sanitizeHTML($el.innerHTML);

			updateBlockContent({
				id: blocksMeta[focusedBlock.index].id,
				content: html,
			});
		},
		[blocksMeta, blocksContent, focusedBlock],
	);

	const onBlockEnterKeyUp = useCallback(
		(e: KeyboardEvent) => {
			if (!focusedBlock) return;
			if (!blocksContent) return;

			const updateNextBlockContent = () => {
				const blockContent = blocksContent[focusedBlock.id];

				if (!blockContent) return;
				if (!blockContent.content) return;

				const $contentEditableLeaf = getBlockContentEditableLeafById(
					focusedBlock.id,
				);

				if (!$contentEditableLeaf) return;
				$contentEditableLeaf.innerHTML = blockContent.content;
			};

			updateNextBlockContent();
		},
		[focusedBlock, blocksContent],
	);

	const onBlockBackspaceKeyUp = useCallback(
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

			// const isContentEmpty = () => {
			// 	const blockContent = blocksContent[focusedBlock.id];

			// 	if (blockContent === undefined) return false;

			// 	const { type } = blocksMeta[focusedBlock.index];

			// 	if (type === IBlockType.Text) {
			// 		const content = blockContent.content as string;

			// 		return content.length === 0 ? true : false;
			// 	}

			// 	return false;
			// };

			onTextBlockInput(e);

			if (isCursorPosAtFirst()) {
				deleteBlock(focusedBlock);
			}
		},
		[focusedBlock, blocksMeta, blocksContent, onTextBlockInput],
	);

	const onBlockArrowDownKeyUp = useCallback(() => {
		if (!blocksMeta) return;
		if (!focusedBlock) return;

		const nextFocusedBlockIndex = focusedBlock.index + 1;

		if (nextFocusedBlockIndex >= blocksMeta.length) return;

		const nextFocusedBlock = blocksMeta[focusedBlock.index + 1];

		if (!nextFocusedBlock) {
			console.error("next block not exist");

			return;
		}

		setFocusedBlock({
			id: nextFocusedBlock.id,
			index: nextFocusedBlockIndex,
		});
	}, [blocksMeta, focusedBlock]);

	const onBlockArrowUpKeyUp = useCallback(() => {
		if (!focusedBlock) return;
		if (!blocksMeta) return;

		const prevBlockIndex = focusedBlock.index - 1;

		if (prevBlockIndex < 0) {
			setFocusedBlock(null);
			setFocusedSection(ISection.Title);

			return;
		}

		const prevBlock = blocksMeta[focusedBlock.index - 1];

		if (!prevBlock) {
			console.error("prev block not exist");

			return;
		}

		setFocusedBlock({ id: prevBlock.id, index: prevBlockIndex });
	}, [blocksMeta, focusedBlock]);

	const onBlockKeyUp = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter": {
					onBlockEnterKeyUp(e);
					break;
				}
				case "Backspace": {
					onBlockBackspaceKeyUp(e);
					break;
				}
				case "ArrowDown": {
					onBlockArrowDownKeyUp();
					break;
				}
				case "ArrowUp": {
					onBlockArrowUpKeyUp();
					break;
				}
				default: {
					onTextBlockInput(e);
				}
			}
		},
		[
			onBlockEnterKeyUp,
			onBlockBackspaceKeyUp,
			onBlockArrowDownKeyUp,
			onBlockArrowUpKeyUp,
			onTextBlockInput,
		],
	);

	return onBlockKeyUp;
};
