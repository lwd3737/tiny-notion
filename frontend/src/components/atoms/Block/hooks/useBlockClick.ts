import { ISection } from "generated/graphql";
import { setFocusedBlock, setFocusedSection } from "operations/mutations";
import React from "react";

export const useBlockClick =
	() =>
	(
		e: React.MouseEvent<Element>,
		{ id, index }: { id: string; index: number },
	) => {
		setFocusedSection(ISection.Content);
		setFocusedBlock({
			id,
			index,
		});
	};
