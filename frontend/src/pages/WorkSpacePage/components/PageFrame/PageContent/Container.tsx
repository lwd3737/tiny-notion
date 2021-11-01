import { memo, useCallback, useEffect } from "react";

import { TextBlock } from "components/molecules/TextBlock";
import { BlockMeta, PageContentContainerProps } from "./types";
import * as S from "./styled";

const PageContentContainer = ({
	isFocused,
	blocksMeta,
	blocksContent,
	focusedBlockIndex,
	onContentFocus,
	onContentBlur,
	onBlockKeyUp,
	onBlockKeyDown,
	onBlockClick,
}: PageContentContainerProps): JSX.Element => {
	const renderBlock = useCallback(
		(blockMeta: BlockMeta, index: number) => {
			const { id } = blockMeta;

			if (blockMeta.type === "text") {
				return (
					<TextBlock
						id={id}
						isFocused={focusedBlockIndex === index}
						key={id}
						value={blocksContent && blocksContent[id]}
						onKeyUp={(e) => onBlockKeyUp(e, id)}
						onKeyDown={onBlockKeyDown}
						onClick={() => onBlockClick(index)}
					/>
				);
			}
		},
		[
			blocksContent,
			focusedBlockIndex,
			onBlockKeyUp,
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
