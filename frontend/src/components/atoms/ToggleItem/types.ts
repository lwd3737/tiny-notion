import { ReactNode } from "react";
import { BlockTheme, TextTheme } from "styles/themes/types";

export type ToggleItemContainerProps = {
	children: ReactNode;
	isToggled: boolean;
	onClick: () => void;
};

//theme
export const ToggleItemThemeSymbol = Symbol("ToggleItemTheme");

export type ToggleItemTheme = {
	block?: BlockTheme;
	text?: TextTheme;
};

declare module "styled-components" {
	interface DefaultTheme {
		[ToggleItemThemeSymbol]?: ToggleItemTheme;
	}
}
