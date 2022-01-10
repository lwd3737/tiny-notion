import "styled-components";
import {
	DetailsHTMLAttributes,
	FocusEventHandler,
	FormEvent,
	KeyboardEvent,
	MouseEventHandler,
} from "react";
import { TextTheme } from "styles/themes/types";

export interface TextInputProps extends DetailsHTMLAttributes<HTMLDivElement> {
	isFocused: boolean;
	value: string | null;
	placeholder: string;
	onKeyDown: (e: KeyboardEvent) => void;
	onFocus?: FocusEventHandler;
	onClick: MouseEventHandler;
}

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
