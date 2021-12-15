import { KeyboardEvent, useCallback } from "react";

export const useTitleKeyDown = () => {
	const onTitleEnterKeyDown = useCallback((e: KeyboardEvent) => {
		e.preventDefault();
	}, []);

	const onTitleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter": {
					onTitleEnterKeyDown(e);
					break;
				}
			}
		},
		[onTitleEnterKeyDown],
	);

	return onTitleKeyDown;
};
