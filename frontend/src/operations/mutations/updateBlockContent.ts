import { ReactiveVar } from "@apollo/client";
import { BlocksContent } from "models/BlocksContent";

export const createUpdateBlockContent = (
	blocksContentVar: ReactiveVar<BlocksContent>,
) => {
	return (blockContent: { id: string; content: any } | null) => {
		if (!blockContent) return;

		const blocksContent = blocksContentVar();
		const { id, content } = blockContent;

		if (!blocksContent) {
			blocksContentVar({
				[id]: {
					id,
					content,
				},
			});
		} else {
			blocksContentVar({
				...blocksContent,
				[id]: {
					id,
					content,
				},
			});
		}
	};
};
