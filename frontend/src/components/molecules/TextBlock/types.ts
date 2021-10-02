import {
	FocusEventHandler,
	KeyboardEventHandler,
	MouseEventHandler,
} from "react";

export type TextBlockContainerProps = {
	text: string;
	isFocused: boolean;
	onKeyDown: KeyboardEventHandler;
	onTextChange: (text: string) => void;
	onFocus?: FocusEventHandler;
	onClick: MouseEventHandler;
};
