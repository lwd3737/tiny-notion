import {
	focusedBlockVar,
	blocksMetaVar,
	blocksContentVar,
	focusedSectionVar,
	titleVar,
} from "cache";
import { createAddBlock } from "./addBlock";
import { createUpdateBlockContent } from "./updateBlockContent";
import { createDeleteBlock } from "./deleteBlock";
import { createSetFocusedBlock } from "./setFocusedBlock";
import { createSetFocusedSection } from "./setFocusedSection";
import { createUpdateTitle } from "./updateTitle";

export const setFocusedSection = createSetFocusedSection(focusedSectionVar);

export const setFocusedBlock = createSetFocusedBlock(focusedBlockVar);

export const addBlock = createAddBlock({
	blocksMetaVar,
	blocksContentVar,
	focusedBlockVar,
});

export const deleteBlock = createDeleteBlock({
	blocksMetaVar,
	blocksContentVar,
	focusedBlockVar,
});

export const updateBlockContent = createUpdateBlockContent(blocksContentVar);

export const updateTitle = createUpdateTitle(titleVar);
