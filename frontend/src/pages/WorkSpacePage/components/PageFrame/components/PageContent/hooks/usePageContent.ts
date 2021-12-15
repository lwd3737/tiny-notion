import { v4 as uuid } from "uuid";
import {
	IBlockType,
	useGetBlocksMetaQuery,
	useGetFocusedBlockQuery,
} from "generated/graphql";
import { useCallback, useEffect } from "react";
import { addBlock, setFocusedBlock } from "operations/mutations";
import { useGetBlocksContent } from "operations/queries";
import {
	useBlockClick,
	useBlockKeyDown,
	useBlockKeyUp,
} from "components/atoms/Block";

export const usePageContent = (isFocused: boolean) => {
	const { data: blocksMetaData } = useGetBlocksMetaQuery();
	const blocksMeta = blocksMetaData?.blocksMeta ?? null;

	const blocksContent = useGetBlocksContent();

	const { data: focusedBlockData } = useGetFocusedBlockQuery();
	const focusedBlock = focusedBlockData?.focusedBlock ?? null;

	const onContentClick = useCallback(() => {}, []);

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

			if (blocksMeta === null && blocksContent !== null) {
				throw new Error("blocksContent must empty");
			}
			if (blocksMeta !== null && blocksContent === null) {
				throw new Error("blocksMeta must empty");
			}

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
		onBlockClick,
		onBlockKeyDown,
		onBlockKeyUp,
	};
};
