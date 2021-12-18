import { ReactiveVar } from "@apollo/client";
import { IBlockType } from "generated/graphql";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";
import { updateContentEditableEl } from "utils/dom";

export const createAddBlock = ({
	focusedBlockVar,
	blocksMetaVar,
	blocksContentVar,
}: {
	focusedBlockVar: ReactiveVar<FocusedBlock>;
	blocksMetaVar: ReactiveVar<BlocksMeta>;
	blocksContentVar: ReactiveVar<BlocksContent>;
}) => {
	return ({
		id,
		type,
		content,
		index,
	}: {
		id: string;
		type: IBlockType;
		content: any;
		index: number;
	}) => {
		//add block to blocksMeta
		const blocksMeta = blocksMetaVar();

		if (!blocksMeta) {
			blocksMetaVar([
				{
					id,
					type,
				},
			]);
		} else {
			blocksMeta.splice(index, 0, { id, type });
			console.log("creating block meta: ", blocksMeta);
			blocksMetaVar([...blocksMeta]);
		}

		//add block to blocksContent
		const blocksContent = blocksContentVar();

		blocksContentVar({
			...blocksContent,
			[id]: {
				id,
				content,
			},
		});

		focusedBlockVar({
			id,
			index,
		});

		updateContentEditableEl(id, content);
	};
};
