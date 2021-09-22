import { ReactNode } from "react";
import { Block, Text } from "styles/themes/types";

export type ToggleItemContainerProps = {
	children: ReactNode;
	isToggled: boolean;
	onClick: () => void;
};

//theme
export const ToggleItemThemeSymbol = Symbol("ToggleItemTheme");

export type ToggleItemTheme = {
	block?: Block;
	text?: Text;
};

declare module "styled-components" {
	interface DefaultTheme {
		[ToggleItemThemeSymbol]?: ToggleItemTheme;
	}
}
