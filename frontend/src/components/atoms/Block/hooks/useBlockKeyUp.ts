import { KeyboardEvent, useCallback } from "react";
import { ISection } from "generated/graphql";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";
import {
	updateBlockContent,
	setFocusedBlock,
	setFocusedSection,
} from "operations/mutations";
import { TextInputElement } from "components/atoms/TextInput";
import { sanitizeHTML } from "components/atoms/TextInput/utils";
import { getBlockContentEditableLeafById } from "utils/dom";

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
				id: focusedBlock.id,
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
			onTextBlockInput(e);
		},
		[onTextBlockInput],
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
