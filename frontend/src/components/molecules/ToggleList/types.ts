import { BlockTheme } from "styles/themes/types";

export type ToggleListContainerProps = {
	data: any[];
	itemToText: (item: any) => string;
};

//theme
export const ToggleListThemeSymbol = Symbol("ToggleListTheme");

export type ToggleListTheme = {
	item?: {
		block?: BlockTheme;
	};
};

declare module "styled-components" {
	interface DefaultTheme {
		[ToggleListThemeSymbol]?: ToggleListTheme;
	}
}
