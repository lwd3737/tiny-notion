import { KeyboardEvent, useCallback } from "react";
import { ISection } from "generated/graphql";
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

export const useBlockKeyUp = ({
	blocksMeta,
	blocksContent,
	focusedBlock,
}: {
	blocksMeta: BlocksMeta | null;
	blocksContent: BlocksContent | null;
	focusedBlock: FocusedBlock | null;
}) => {
	const onBlockEnterKeyUp = useCallback((e: KeyboardEvent) => {
		// if (focusedBlockIndex === null) return;
		// if (blocksMeta === null) return;
		// const $el = e.target as TextInputElement;
		//const html = sanitizeHTML($el.innerHTML);
		//const nextFocusedBlockIndex = focusedBlockIndex + 1;
		// setBlocksContent({
		// 	...blocksContent,
		// 	[focusedBlockIndex]: html,
		// });
		//createBlock("text", blocksMeta, nextFocusedBlockIndex);
	}, []);

	const onBlockBackspaceKeyUp = useCallback(() => {
		if (!blocksMeta) return;
		if (!blocksContent) return;
		if (!focusedBlock) return;

		const isContentEmpty = !blocksContent[focusedBlock.id];

		if (isContentEmpty) {
			deleteBlock(focusedBlock);
		}
	}, [focusedBlock, blocksMeta, blocksContent]);

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

	const onTextBlockInput = useCallback(
		(e) => {
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

	const onBlockKeyUp = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter": {
					onBlockEnterKeyUp(e);
					break;
				}
				case "Backspace": {
					onBlockBackspaceKeyUp();
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
