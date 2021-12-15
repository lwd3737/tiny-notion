import { ReactiveVar } from "@apollo/client";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";

export const createDeleteBlock = ({
	blocksMetaVar,
	blocksContentVar,
	focusedBlockVar,
}: {
	blocksMetaVar: ReactiveVar<BlocksMeta | null>;
	blocksContentVar: ReactiveVar<BlocksContent | null>;
	focusedBlockVar: ReactiveVar<FocusedBlock | null>;
}) => {
	return (focusedBlock: FocusedBlock) => {
		const blocksMeta = blocksMetaVar();
		const blocksContent = blocksContentVar();

		if (!blocksMeta) return;
		if (!blocksContent) return;
		if (!focusedBlock) return;

		blocksMeta.splice(focusedBlock.index, 1);

		if (blocksMeta.length === 0) {
			blocksMetaVar(null);
		} else {
			blocksMetaVar(blocksMeta);
		}

		//delete block from blocksContent
		delete blocksContent[focusedBlock.id];

		const blocksContentLength = Object.keys(blocksContent).length;

		if (blocksContentLength === 0) {
			blocksContentVar(null);
		} else {
			blocksContentVar(blocksContent);
		}

		//set focusedBlockId
		if (focusedBlock.index > 0) {
			const prevIndex = focusedBlock.index - 1;
			const prevId = blocksMeta[prevIndex].id;

			focusedBlockVar({
				id: prevId,
				index: prevIndex,
			});
		} else {
			focusedBlockVar(null);
		}
	};
};
