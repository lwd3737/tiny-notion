import { InputEvent } from "components/atoms/TextInput";
import {
	FocusEventHandler,
	KeyboardEventHandler,
	MouseEventHandler,
} from "react";

export type TextBlockContainerProps = {
	value: string;
	isFocused: boolean;
	onKeyDown: KeyboardEventHandler;
	onInput: (e: InputEvent) => void;
	onFocus?: FocusEventHandler;
	onClick: MouseEventHandler;
};
