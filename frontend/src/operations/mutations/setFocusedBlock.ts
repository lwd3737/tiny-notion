import { ReactiveVar } from "@apollo/client";
import { FocusedBlock } from "models/FocusedBlock";

export const createSetFocusedBlock = (
	focusedBlockVar: ReactiveVar<FocusedBlock>,
) => {
	return (focusedBlock: { id: string; index: number } | null) => {
		focusedBlockVar(focusedBlock);
	};
};
