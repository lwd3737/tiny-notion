import {
	KeyboardEventHandler,
	memo,
	useCallback,
	useEffect,
	useState,
} from "react";
import { v4 as uuid } from "uuid";

import { TextBlock } from "components/molecules/TextBlock";
import * as S from "./styled";
import { Block, BlocksContent, PageContentContainerProps } from "./types";

const PageContentContainer = ({
	isFocused,
	onTitleFocus,
	onBlockClick,
}: PageContentContainerProps): JSX.Element => {
	const [blocks, setBlocks] = useState<Block[] | null>(null);
	const [blocksContent, setBlocksContent] = useState<BlocksContent | null>(
		null,
	);
	const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
		null,
	);

	const onTextBlockChange = useCallback(
		(id: string, text: string) => {
			setBlocksContent({
				...blocksContent,
				[id]: text,
			});
		},
		[blocksContent],
	);

	const onEnterKeyDown = useCallback(() => {
		if (focusedBlockIndex !== null && blocks !== null) {
			const nextFocusedIndex = focusedBlockIndex + 1;
			const newBlocks = blocks.slice();
			const id = uuid();

			newBlocks.splice(nextFocusedIndex, 0, {
				id,
				type: "text",
			});

			setBlocks(newBlocks);
			setFocusedBlockIndex(nextFocusedIndex);
			setBlocksContent({
				...blocksContent,
				[id]: "",
			});
		}
	}, [blocks, blocksContent, focusedBlockIndex]);

	const onBackspaceKeyDown = useCallback(() => {
		if (
			blocks !== null &&
			blocksContent !== null &&
			focusedBlockIndex !== null
		) {
			const { id } = blocks[focusedBlockIndex];

			if (blocksContent[id] !== undefined && blocksContent[id].length === 0) {
				const prevFocusedIndex = focusedBlockIndex - 1;
				let prevBlocks: Block[] | null = blocks.slice();
				let prevBlocksContent: BlocksContent | null = Object.assign(
					{},
					blocksContent,
				);

				delete prevBlocksContent[id];
				prevBlocks.splice(focusedBlockIndex, 1);

				if (prevBlocks.length === 0) {
					prevBlocks = null;
					prevBlocksContent = null;
				}

				setBlocks(prevBlocks);
				setBlocksContent(prevBlocksContent);

				if (prevFocusedIndex < 0) {
					setFocusedBlockIndex(null);
					onTitleFocus();
				} else {
					setFocusedBlockIndex(prevFocusedIndex);
				}
			}
		}
	}, [blocks, blocksContent, focusedBlockIndex, onTitleFocus]);

	const onBlockKeyDown: KeyboardEventHandler = useCallback(
		(e) => {
			if (e.key === "Enter") {
				onEnterKeyDown();
			}

			if (e.key === "Backspace") {
				onBackspaceKeyDown();
			}
		},
		[onEnterKeyDown, onBackspaceKeyDown],
	);

	const _onBlockClick = useCallback(
		(index: number) => {
			onBlockClick();
			setFocusedBlockIndex(index);
		},
		[onBlockClick],
	);

	const renderBlock = useCallback(
		(block: Block, index: number) => {
			if (block.type === "text") {
				return (
					<TextBlock
						isFocused={focusedBlockIndex === index}
						key={block.id}
						text={blocksContent && blocksContent[block.id]}
						onKeyDown={onBlockKeyDown}
						onTextChange={(text) => onTextBlockChange(block.id, text)}
						onClick={() => _onBlockClick(index)}
					/>
				);
			}
		},
		[
			blocksContent,
			focusedBlockIndex,
			onTextBlockChange,
			onBlockKeyDown,
			_onBlockClick,
		],
	);

	useEffect(() => {
		const onFocus = () => {
			if (!isFocused) return;

			if (blocks === null) {
				const id = uuid();
				setFocusedBlockIndex(0);
				setBlocks([
					{
						id,
						type: "text",
					},
				]);
				setBlocksContent({
					[id]: "",
				});
			}
		};

		onFocus();
	}, [blocks, isFocused]);

	useEffect(() => {
		const onBlur = () => {
			if (isFocused) return;

			setFocusedBlockIndex(null);
		};

		onBlur();
	}, [isFocused]);

	return <S.PageContent>{blocks && blocks.map(renderBlock)}</S.PageContent>;
};

export default memo(PageContentContainer);
