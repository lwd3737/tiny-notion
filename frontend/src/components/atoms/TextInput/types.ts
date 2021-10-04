import "styled-components";
import {
	FocusEventHandler,
	FormEvent,
	KeyboardEventHandler,
	MouseEventHandler,
} from "react";
import { TextTheme } from "styles/themes/types";

export type TextInputContainerProps = {
	isFocused: boolean;
	value: string | null;
	placeHolder: string;
	onInput: (e: InputEvent) => void;
	onKeyDown: KeyboardEventHandler;
	onFocus?: FocusEventHandler;
	onClick: MouseEventHandler;
};

export type InputEvent = FormEvent<TextInputElement>;

export type TextInputElement = HTMLDivElement;

//theme
export const TextInputThemeSymbol = Symbol("TextInputTheme");

export type TextInputTheme = {
	content?: {
		text?: TextTheme;
	};
	placeHolder?: TextTheme;
};

declare module "styled-components" {
	interface DefaultTheme {
		[TextInputThemeSymbol]?: TextInputTheme;
	}
}
