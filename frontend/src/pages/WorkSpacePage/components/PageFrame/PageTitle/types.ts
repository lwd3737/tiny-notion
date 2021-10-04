import { InputEvent } from "components/atoms/TextInput";
import { KeyboardEventHandler, MouseEventHandler } from "react";

export type PageTitleContainerProps = {
	title: string | null;
	isFocused: boolean;
	onInput: (e: InputEvent) => void;
	onKeyDown: KeyboardEventHandler;
	onClick: MouseEventHandler;
};
