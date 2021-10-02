import "styled-components";
import {
	FocusEventHandler,
	KeyboardEventHandler,
	MouseEventHandler,
} from "react";
import { TextTheme } from "styles/themes/types";

export type TextInputContainerProps = {
	isFocused: boolean;
	value: string;
	placeHolder: string;
	onTextChange: (text: string) => void;
	onKeyDown: KeyboardEventHandler;
	onFocus?: FocusEventHandler;
	onClick: MouseEventHandler;
};

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
