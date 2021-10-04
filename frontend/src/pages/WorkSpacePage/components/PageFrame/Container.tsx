import { InputEvent, TextInputElement } from "components/atoms/TextInput";
import {
	ChangeEvent,
	KeyboardEventHandler,
	useCallback,
	useState,
} from "react";
import { v4 as uuid } from "uuid";

import { PageContent } from "./PageContent";
import { BlockMeta, BlocksContent, BlockType } from "./PageContent/types";
import { PageTitle } from "./PageTitle";
import * as S from "./styled";

const PageFrameContainer = () => {
	const [focusedTarget, setFocusedTarget] = useState<
		"title" | "content" | null
	>(null);

	const [title, setTitle] = useState<string | null>(null);

	const [blocksMeta, setBlocksMeta] = useState<BlockMeta[] | null>(null);
	const [blocksContent, setBlocksContent] = useState<BlocksContent | null>(
		null,
	);
	const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
		null,
	);

	const createBlock = useCallback(
		(
			type: BlockType,
			prevBlocksMeta: BlockMeta[] | null,
			focusedBlockIndex: number,
		) => {
			const id = uuid();
			const nextBlocksMeta = prevBlocksMeta?.slice() ?? [];
			let content;

			if (type === "text") {
				content = "";
			}

			nextBlocksMeta.splice(focusedBlockIndex, 0, {
				id,
				type,
			});
			setBlocksMeta(nextBlocksMeta);
			setFocusedBlockIndex(focusedBlockIndex);
			setBlocksContent({
				...blocksContent,
				[id]: content,
			});
		},
		[blocksContent],
	);

	const onTitleInput = useCallback((e: InputEvent) => {
		const { innerText } = e.target as TextInputElement;

		setTitle(innerText);
	}, []);

	const onTitleClick = useCallback((e) => {
		setFocusedTarget("title");
	}, []);

	const onTitleKeyDown: KeyboardEventHandler = useCallback(
		(e) => {
			if (e.key === "Enter") {
				setFocusedTarget("content");

				if (blocksMeta !== null) {
					createBlock("text", blocksMeta, 0);
				}
			}

			if (e.key === "ArrowDown") {
				if (blocksMeta && blocksMeta.length > 0) {
					setFocusedBlockIndex(0);
					setFocusedTarget("content");
				}
			}
		},
		[blocksMeta, createBlock],
	);

	const onTextBlockInput = useCallback(
		(e: InputEvent, id: string) => {
			const { innerText } = e.target as TextInputElement;

			setBlocksContent({
				...blocksContent,
				[id]: innerText,
			});
		},
		[blocksContent],
	);

	const onBlockEnterKeyDown = useCallback(() => {
		if (focusedBlockIndex !== null && blocksMeta !== null) {
			const nextFocusedBlockIndex = focusedBlockIndex + 1;

			createBlock("text", blocksMeta, nextFocusedBlockIndex);
		}
	}, [blocksMeta, focusedBlockIndex, createBlock]);

	const onBlockBackspaceKeyDown = useCallback(() => {
		if (
			blocksMeta !== null &&
			blocksContent !== null &&
			focusedBlockIndex !== null
		) {
			const { id } = blocksMeta[focusedBlockIndex];
			const isContentEmpty =
				blocksContent[id] !== undefined && blocksContent[id].length === 0;

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

	const onBlockArrowDownKeyDown = useCallback(() => {
		if (focusedBlockIndex === null) return;

		const nextFocusedBlockIndex = focusedBlockIndex + 1;

		if (!blocksMeta || !blocksMeta[nextFocusedBlockIndex]) return;

		setFocusedBlockIndex(nextFocusedBlockIndex);
	}, [blocksMeta, focusedBlockIndex]);

	const onBlockArrowUpKeyDown = useCallback(() => {
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

	const onBlockKeyDown: KeyboardEventHandler = useCallback(
		(e) => {
			if (e.key === "Enter") {
				onBlockEnterKeyDown();
			}

			if (e.key === "Backspace") {
				onBlockBackspaceKeyDown();
			}

			if (e.key === "ArrowDown") {
				onBlockArrowDownKeyDown();
			}

			if (e.key === "ArrowUp") {
				onBlockArrowUpKeyDown();
			}
		},
		[
			onBlockEnterKeyDown,
			onBlockBackspaceKeyDown,
			onBlockArrowDownKeyDown,
			onBlockArrowUpKeyDown,
		],
	);

	const onBlockClick = useCallback((index: number) => {
		setFocusedTarget("content");
		setFocusedBlockIndex(index);
	}, []);

	const onContentFocus = useCallback(() => {
		const initializeContent = () => {
			const id = uuid();
			setFocusedBlockIndex(0);
			setBlocksMeta([
				{
					id,
					type: "text",
				},
			]);
			setBlocksContent({
				[id]: "",
			});
		};

		if (blocksMeta === null) {
			initializeContent();
		}
	}, [blocksMeta]);

	const onContentBlur = useCallback(() => {
		setFocusedBlockIndex(null);
	}, []);

	return (
		<S.PageFrame>
			<PageTitle
				isFocused={focusedTarget === "title"}
				title={title}
				onInput={onTitleInput}
				onKeyDown={onTitleKeyDown}
				onClick={onTitleClick}
			/>
			<PageContent
				isFocused={focusedTarget === "content"}
				blocksMeta={blocksMeta}
				blocksContent={blocksContent}
				focusedBlockIndex={focusedBlockIndex}
				onContentFocus={onContentFocus}
				onContentBlur={onContentBlur}
				onBlockKeyDown={onBlockKeyDown}
				onBlockClick={onBlockClick}
				onTextBlockInput={onTextBlockInput}
			/>
		</S.PageFrame>
	);
};

export default PageFrameContainer;
