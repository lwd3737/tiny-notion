import { ReactiveVar } from "@apollo/client";
import { FocusedBlock } from "models/FocusedBlock";

export const createSetFocusedBlock = (
	focusedBlockVar: ReactiveVar<FocusedBlock>,
) => {
	return (focusedBlock: { id: string; index: number } | null) => {
		console.log("focused: ", focusedBlock);

		focusedBlockVar(focusedBlock);
		console.trace("focused var: ", focusedBlockVar());
	};
};
