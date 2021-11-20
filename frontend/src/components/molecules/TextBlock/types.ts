import { FocusEventHandler, KeyboardEvent, MouseEventHandler } from "react";

export type TextBlockProps = {
	id: string;
	value: string;
	isFocused: boolean;
	onKeyUp: (e: KeyboardEvent) => void;
	onKeyDown: (e: KeyboardEvent) => void;
	onFocus?: FocusEventHandler;
	onClick: MouseEventHandler;
};
