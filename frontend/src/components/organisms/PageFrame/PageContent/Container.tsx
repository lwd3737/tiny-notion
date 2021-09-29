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
import {} from "components/atoms/TextInput";

const PageContentContainer = ({
	isFocused,
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
				const newBlocks = blocks.slice();
				const newBlocksContent = Object.assign({}, blocksContent);

				delete newBlocksContent[id];

				newBlocks.splice(focusedBlockIndex, 1);

				setBlocks(newBlocks);
				setFocusedBlockIndex(prevFocusedIndex);
				setBlocksContent(newBlocksContent);
			}
		}
	}, [blocks, blocksContent, focusedBlockIndex]);

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
					/>
				);
			}
		},
		[blocksContent, focusedBlockIndex, onTextBlockChange, onBlockKeyDown],
	);

	useEffect(() => {
		const onContentFocus = () => {
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

		onContentFocus();
	}, [blocks, isFocused]);

	return <S.PageContent>{blocks && blocks.map(renderBlock)}</S.PageContent>;
};

export default memo(PageContentContainer);
