import { v4 as uuid } from "uuid";
import {
	IBlockType,
	ISection,
	useGetBlocksMetaQuery,
	useGetFocusedBlockQuery,
} from "generated/graphql";
import { MouseEvent, useCallback, useEffect } from "react";
import {
	addBlock,
	setFocusedBlock,
	setFocusedSection,
} from "operations/mutations";
import { useGetBlocksContent } from "operations/queries";
import {
	useBlockClick,
	useBlockKeyDown,
	useBlockKeyUp,
} from "components/atoms/Block";

export const usePageContent = (isFocused: boolean) => {
	const { data: blocksMetaData } = useGetBlocksMetaQuery();
	const blocksMeta = blocksMetaData?.blocksMeta;

	const blocksContent = useGetBlocksContent();

	const { data: focusedBlockData } = useGetFocusedBlockQuery();
	const focusedBlock = focusedBlockData?.focusedBlock ?? null;

	console.log("blocksMeta: ");
	console.log(blocksMeta);
	console.log("blocksContent: ");
	console.log(blocksContent);
	console.log("focusedBlock: ");
	console.log(focusedBlock);

	const onContentClick = useCallback(
		(e: MouseEvent) => {
			setFocusedSection(ISection.Content);

			if (!blocksMeta) {
				addBlock({
					id: uuid(),
					type: IBlockType.Text,
					content: "",
					index: 0,
				});
			}
		},
		[blocksMeta],
	);

	const onBlockKeyUp = useBlockKeyUp({
		blocksMeta,
		blocksContent,
		focusedBlock,
	});
	const onBlockKeyDown = useBlockKeyDown({
		blocksMeta,
		blocksContent,
		focusedBlock,
	});
	const onBlockClick = useBlockClick();

	useEffect(() => {
		const onContentFocus = () => {
			if (!isFocused) return;
			if (blocksMeta === null && blocksContent === null) {
				const id = uuid();

				addBlock({
					id,
					type: IBlockType.Text,
					content: "",
					index: 0,
				});
			}
		};

		onContentFocus();
	}, [isFocused, blocksMeta, blocksContent]);

	useEffect(() => {
		const onContentBlur = () => {
			if (isFocused) return;

			setFocusedBlock(null);
		};

		onContentBlur();
	}, [isFocused]);

	return {
		blocksMeta,
		blocksContent,
		focusedBlock,
		onContentClick,
		onBlockClick,
		onBlockKeyDown,
		onBlockKeyUp,
	};
};
