import { ISection } from "generated/graphql";
import { setFocusedSection } from "operations/mutations";
import { MouseEvent, useCallback } from "react";

export const useTitleClick = () => {
	const onTitleClick = useCallback((e: MouseEvent) => {
		setFocusedSection(ISection.Title);
	}, []);

	return onTitleClick;
};
