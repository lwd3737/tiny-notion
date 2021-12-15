import { memo, useCallback } from "react";

import { TextBlock } from "components/molecules/TextBlock";
import { PageContentProps } from "./types";
import * as S from "./styled";
import { IBlockType } from "generated/graphql";
import { usePageContent } from "./hooks";
import { BlockMeta } from "models/BlocksMeta";

const PageContent = ({ isFocused }: PageContentProps): JSX.Element => {
	const {
		blocksMeta,
		blocksContent,
		focusedBlock,
		onBlockClick,
		onBlockKeyDown,
		onBlockKeyUp,
	} = usePageContent(isFocused);

	const renderBlock = useCallback(
		(blockMeta: BlockMeta, index: number) => {
			if (!blockMeta) return null;
			if (!blocksContent) return null;

			const { id } = blockMeta;
			const blockContent = blocksContent[id];

			if (blockMeta.type === IBlockType.Text) {
				const content = (blockContent?.content as string) ?? null;

				return (
					<TextBlock
						id={id}
						isFocused={focusedBlock?.id === id}
						key={id}
						value={content}
						onKeyUp={onBlockKeyUp}
						onKeyDown={onBlockKeyDown}
						onClick={(e) => onBlockClick(e, { id, index })}
					/>
				);
			}

			return null;
		},
		[blocksContent, focusedBlock, onBlockKeyUp, onBlockKeyDown, onBlockClick],
	);

	const renderEmptyTemplate = useCallback(() => {
		return (
			<S.EmptyTemplate>Enter 키를 눌러 빈 페이지를 사용하세요</S.EmptyTemplate>
		);
	}, []);

	return (
		<S.PageContent>
			{blocksMeta ? blocksMeta.map(renderBlock) : renderEmptyTemplate()}
		</S.PageContent>
	);
};

export default memo(PageContent);
