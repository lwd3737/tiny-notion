import { memo, useCallback } from "react";

import { TextBlock } from "components/molecules/TextBlock";
import { PageContentProps } from "./types";
import * as S from "./styled";
import { IBlockType } from "generated/graphql";
import { usePageContent } from "./hooks";
import { BlockMeta } from "models/BlocksMeta";
import { TextBlockContent } from "models/BlocksContent";

const PageContent = ({ isFocused }: PageContentProps): JSX.Element => {
	const {
		blocksMeta,
		blocksContent,
		focusedBlock,
		onContentClick,
		onBlockClick,
		onBlockKeyDown,
	} = usePageContent(isFocused);

	const renderBlock = useCallback(
		(blockMeta: BlockMeta, index: number) => {
			if (!blockMeta) return null;
			if (!blocksContent) return null;

			const { id } = blockMeta;
			const blockContent = blocksContent[id];

			if (blockMeta.type === IBlockType.Text) {
				const content = (blockContent?.content as TextBlockContent) ?? null;

				return (
					<TextBlock
						key={id}
						id={id}
						isFocused={focusedBlock?.id === id}
						value={content.value}
						onKeyDown={onBlockKeyDown}
						onClick={(e) => {
							onBlockClick(e, { id, index });
						}}
					/>
				);
			}

			return null;
		},
		[blocksContent, focusedBlock, onBlockKeyDown, onBlockClick],
	);

	const renderEmptyTemplate = useCallback(() => {
		return (
			<S.EmptyTemplate>Enter 키를 눌러 빈 페이지를 사용하세요</S.EmptyTemplate>
		);
	}, []);

	return (
		<S.PageContent onClick={onContentClick}>
			{blocksMeta ? blocksMeta.map(renderBlock) : renderEmptyTemplate()}
		</S.PageContent>
	);
};

export default memo(PageContent);
