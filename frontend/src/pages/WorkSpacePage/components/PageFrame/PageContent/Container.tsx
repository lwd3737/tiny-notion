import { memo, useCallback, useEffect } from "react";

import { TextBlock } from "components/molecules/TextBlock";
import { BlockMeta, PageContentContainerProps } from "./types";
import { InputEvent } from "components/atoms/TextInput";
import * as S from "./styled";

const PageContentContainer = ({
	isFocused,
	blocksMeta,
	blocksContent,
	focusedBlockIndex,
	onContentFocus,
	onContentBlur,
	onBlockKeyDown,
	onBlockClick,
	onTextBlockInput,
}: PageContentContainerProps): JSX.Element => {
	const renderBlock = useCallback(
		(block: BlockMeta, index: number) => {
			if (block.type === "text") {
				return (
					<TextBlock
						isFocused={focusedBlockIndex === index}
						key={block.id}
						value={blocksContent && blocksContent[block.id]}
						onKeyDown={onBlockKeyDown}
						onInput={(e: InputEvent) => onTextBlockInput(e, block.id)}
						onClick={() => onBlockClick(index)}
					/>
				);
			}
		},
		[
			blocksContent,
			focusedBlockIndex,
			onTextBlockInput,
			onBlockKeyDown,
			onBlockClick,
		],
	);

	const renderEmptyTemplate = useCallback(() => {
		return (
			<S.EmptyTemplate>Enter 키를 눌러 빈 페이지를 사용하세요</S.EmptyTemplate>
		);
	}, []);

	useEffect(() => {
		const onFocus = () => {
			if (!isFocused) return;

			onContentFocus();
		};

		onFocus();
	}, [isFocused, onContentFocus]);

	useEffect(() => {
		const onBlur = () => {
			if (isFocused) return;

			onContentBlur();
		};

		onBlur();
	}, [isFocused, onContentBlur]);

	return (
		<S.PageContent>
			{blocksMeta ? blocksMeta.map(renderBlock) : renderEmptyTemplate()}
		</S.PageContent>
	);
};

export default memo(PageContentContainer);
