import { ReactiveVar } from "@apollo/client";
import { FocusedSection } from "models/FocusedSection";

export const createSetFocusedSection = (
	focusedSectionVar: ReactiveVar<FocusedSection>,
) => {
	return (section: FocusedSection) => {
		focusedSectionVar(section);
	};
};
