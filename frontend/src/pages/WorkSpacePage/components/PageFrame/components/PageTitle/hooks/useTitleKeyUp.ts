import { TextInputElement } from "components/atoms/TextInput";
import { ISection } from "generated/graphql";
import { FocusedBlock } from "models/FocusedBlock";
import {
	setFocusedBlock,
	setFocusedSection,
	updateTitle,
} from "operations/mutations";
import { KeyboardEvent, useCallback } from "react";

export const useTitleKeyUp = ({
	focusedBlock,
}: {
	focusedBlock: FocusedBlock;
}) => {
	const onTitleEnterKeyUp = useCallback(() => {
		setFocusedSection(ISection.Content);

		//TODO: create block of 0 index then pass content of cursor after to block of 0 index
	}, []);

	const onTitleArrowDownKeyUp = useCallback(() => {
		setFocusedSection(ISection.Content);

		if (!focusedBlock) return;

		setFocusedBlock(focusedBlock);
	}, [focusedBlock]);

	const onTitleInput = useCallback((e: KeyboardEvent) => {
		const $el = e.target as TextInputElement;

		updateTitle($el.innerHTML);
	}, []);

	const onTitleKeyUp = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Enter": {
					onTitleEnterKeyUp();
					break;
				}
				case "ArrowDown": {
					onTitleArrowDownKeyUp();
					break;
				}
				default: {
					onTitleInput(e);
				}
			}
		},
		[onTitleEnterKeyUp, onTitleArrowDownKeyUp, onTitleInput],
	);

	return onTitleKeyUp;
};
