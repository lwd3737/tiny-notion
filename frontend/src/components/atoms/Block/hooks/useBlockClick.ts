import { setFocusedBlock } from "operations/mutations";
import React from "react";

export const useBlockClick =
	() =>
	(
		e: React.MouseEvent<Element>,
		{ id, index }: { id: string; index: number },
	) => {
		setFocusedBlock({
			id,
			index,
		});
	};
