import { TextInputElement } from "components/atoms/TextInput";
import { sanitizeHTML } from "components/atoms/TextInput/utils";
import { getBlockContentEditableLeafById } from "components/molecules/TextBlock/utils";
import { KeyboardEvent, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import { BlockMeta, BlocksContent, BlockType } from "../PageContent/types";

const usePage = () => {
	const [focusedTarget, setFocusedTarget] = useState<
		"title" | "content" | null
	>(null);
	const [caretPos, setCaretPos] = useState<number | null>(null);

	const [title, setTitle] = useState<string | null>(null);

	const [blocksMeta, setBlocksMeta] = useState<BlockMeta[] | null>(null);
	const [blocksContent, setBlocksContent] = useState<BlocksContent | null>(
		null,
	);
	const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
		null,
	);

	const updateCaretPos = useCallback(() => {
		const selection = document.getSelection();

		if (selection === null) return;

		if (selection.type === "Caret") {
			const { focusOffset } = selection;

			setCaretPos(focusOffset);
		}
	}, []);

	const createBlock = useCallback(
		({
			type,
			prevBlocksMeta,
			nextFocusedBlockIndex,
			content,
		}: {
			type: BlockType;
			prevBlocksMeta: BlockMeta[] | null;
			nextFocusedBlockIndex: number;
			content?: any;
		}) => {
			const id = uuid();
			const nextBlocksMeta = prevBlocksMeta?.slice() ?? [];

			const updateContentEditableEl = (id: string, content: string) => {
				const $contentEditableLeaf = getBlockContentEditableLeafById(id);

				if ($contentEditableLeaf === null) return;

				$contentEditableLeaf.innerHTML = content;
			};

			if (content === undefined) {
				if (type === "text") {
					content = "";
				}
			}

			nextBlocksMeta.splice(nextFocusedBlockIndex, 0, {
				id,
				index: nextFocusedBlockIndex,
				type,
			});

			setBlocksMeta(nextBlocksMeta);
			setFocusedBlockIndex(nextFocusedBlockIndex);
			setBlocksContent({
				...blocksContent,
				[id]: content,
			});

			setTimeout(() => {
				updateContentEditableEl(id, content);
			}, 0);
		},
		[blocksContent],
	);

	//title
	const onTitleClick = useCallback((e) => {
		setFocusedTarget("title");
	}, []);

	const onTitleEnterKeyUp = useCallback(() => {
		setFocusedTarget("content");

		if (blocksMeta !== null) {
			createBlock({
				type: "text",
				prevBlocksMeta: blocksMeta,
				nextFocusedBlockIndex: 0,
			});
		}
	}, [blocksMeta, createBlock]);

	const onTitleArrowDownKeyUp = useCallback(() => {
		if (blocksMeta === null || blocksMeta.length === 0) return;

		setFocusedBlockIndex(0);
		setFocusedTarget("content");
	}, [blocksMeta]);

	const onTitleInput = useCallback(($el: TextInputElement) => {
		setTitle($el.innerText);
	}, []);

	const onTitleEnterKeyDown = useCallback((e: KeyboardEvent) => {
		e.preventDefault();
	}, []);

	const onTitleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter": {
					onTitleEnterKeyDown(e);
					break;
				}
			}
		},
		[onTitleEnterKeyDown],
	);

	const onTitleKeyUp = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter": {
					onTitleEnterKeyUp();
					break;
				}
				case "ArrowDown": {
					onTitleArrowDownKeyUp();
					break;
				}
				default: {
					const $el = e.target as TextInputElement;

					onTitleInput($el);
				}
			}
		},
		[onTitleEnterKeyUp, onTitleArrowDownKeyUp, onTitleInput],
	);

	//content
	const onTextBlockInput = useCallback(
		(e) => {
			if (focusedBlockIndex === null) return;
			if (blocksMeta === null) return;

			const $el = e.target as TextInputElement;
			const html = sanitizeHTML($el.innerHTML);
			const blockMeta = blocksMeta.find(
				(block) => block.index === focusedBlockIndex,
			);

			if (!blockMeta) return;

			setBlocksContent({
				...blocksContent,
				[blockMeta.id]: html,
			});
		},
		[focusedBlockIndex, blocksMeta, blocksContent],
	);

	const onBlockEnterKeyDown = useCallback(
		(e: KeyboardEvent) => {
			e.preventDefault();

			if (focusedBlockIndex === null) return;
			if (blocksMeta === null) return;

			const nextFocusedBlockIndex = focusedBlockIndex + 1;

			const selection = document.getSelection();
			let content;

			const updateCurrentBlockContent = () => {
				const blockMeta = blocksMeta.find(
					(meta) => meta.index === focusedBlockIndex,
				);

				if (blockMeta) {
					const $contentEditableLeaf = getBlockContentEditableLeafById(
						blockMeta.id,
					);

					if ($contentEditableLeaf) {
						const value = $contentEditableLeaf.innerHTML;

						setBlocksContent((blocksContent) => ({
							...blocksContent,
							[blockMeta.id]: value,
						}));
					}
				}
			};

			if (selection) {
				const range = selection.getRangeAt(0);
				let { endContainer } = range;

				if (endContainer.nodeType === Node.ELEMENT_NODE) {
					const $endContainer = endContainer as HTMLElement;

					if (
						$endContainer.dataset.contentEditableLeaf === "true" &&
						$endContainer.lastChild
					) {
						endContainer = $endContainer.lastChild;
					}
				}

				const lastOffset = endContainer.textContent?.length;

				if (lastOffset) {
					console.log("end container: ", endContainer, lastOffset);
					range.setEnd(endContainer, lastOffset);

					const $content = range.extractContents().firstChild as Node;

					if ($content && $content.nodeType === Node.TEXT_NODE) {
						const $textNode = $content as Text;

						content = $textNode.data;
					}

					setTimeout(() => updateCurrentBlockContent(), 0);
				}
			}

			createBlock({
				type: "text",
				prevBlocksMeta: blocksMeta,
				nextFocusedBlockIndex,
				content,
			});
		},
		[blocksMeta, focusedBlockIndex, createBlock],
	);

	const onBlockKeyDown = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter":
					onBlockEnterKeyDown(e);
					break;
			}
		},
		[onBlockEnterKeyDown],
	);

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
		if (
			blocksMeta !== null &&
			blocksContent !== null &&
			focusedBlockIndex !== null
		) {
			const { id } = blocksMeta[focusedBlockIndex];
			const isContentEmpty =
				blocksContent[id] !== undefined &&
				blocksContent[id] !== null &&
				blocksContent[id].length === 0;

			if (isContentEmpty) {
				let nextBlocksMeta: BlockMeta[] | null = blocksMeta.slice();
				let nextBlocksContent: BlocksContent | null = Object.assign(
					{},
					blocksContent,
				);

				delete nextBlocksContent[id];
				nextBlocksMeta.splice(focusedBlockIndex, 1);

				if (nextBlocksMeta.length === 0) {
					nextBlocksMeta = null;
					nextBlocksContent = null;
				}

				setBlocksMeta(nextBlocksMeta);
				setBlocksContent(nextBlocksContent);

				const nextFocusedIndex = focusedBlockIndex - 1;

				if (nextFocusedIndex < 0) {
					setFocusedBlockIndex(null);
					setFocusedTarget("title");
				} else {
					setFocusedBlockIndex(nextFocusedIndex);
				}
			}
		}
	}, [blocksMeta, blocksContent, focusedBlockIndex]);

	const onBlockArrowDownKeyUp = useCallback(() => {
		if (focusedBlockIndex === null) return;

		const nextFocusedBlockIndex = focusedBlockIndex + 1;

		if (!blocksMeta || !blocksMeta[nextFocusedBlockIndex]) return;

		setFocusedBlockIndex(nextFocusedBlockIndex);
	}, [blocksMeta, focusedBlockIndex]);

	const onBlockArrowUpKeyUp = useCallback(() => {
		if (focusedBlockIndex === null) return;

		const prevFocusedBlockIndex = focusedBlockIndex - 1;

		if (blocksMeta && blocksMeta[prevFocusedBlockIndex]) {
			setFocusedBlockIndex(prevFocusedBlockIndex);
		} else {
			setFocusedBlockIndex(null);
			setFocusedTarget("title");
		}

		setFocusedBlockIndex(focusedBlockIndex - 1);
	}, [focusedBlockIndex, blocksMeta]);

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

	const onBlockClick = useCallback(
		(index: number) => {
			setFocusedTarget("content");
			setFocusedBlockIndex(index);

			updateCaretPos();
		},
		[updateCaretPos],
	);

	const onContentFocus = useCallback(() => {
		const initializeContent = () => {
			const id = uuid();
			setFocusedBlockIndex(0);
			setBlocksMeta([
				{
					id,
					index: 0,
					type: "text",
				},
			]);
			setBlocksContent({
				[id]: null,
			});
		};

		if (blocksMeta === null) {
			initializeContent();
		}
	}, [blocksMeta]);

	const onContentBlur = useCallback(() => {
		setFocusedBlockIndex(null);
	}, []);

	return {
		focusedTarget,

		pageTitle: {
			title,
			onTitleClick,
			onTitleKeyUp,
			onTitleKeyDown,
		},
		pageContent: {
			blocksMeta,
			blocksContent,
			focusedBlockIndex,
			onContentFocus,
			onContentBlur,
			onBlockKeyUp,
			onBlockKeyDown,
			onBlockClick,
		},
	};
};

export default usePage;
