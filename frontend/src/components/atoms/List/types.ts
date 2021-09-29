import "styled-components";
import { BlockTheme } from "styles/themes/types/units";

export type ListContainerProps<Item> = {
	data: Item[];
	renderItem: (item: Item, index: number) => JSX.Element;
};

//theme
export const ListThemeSymbol = Symbol("ListTheme");

export type ListTheme = {
	block?: BlockTheme;
};

declare module "styled-components" {
	interface DefaultTheme {
		[ListThemeSymbol]?: ListTheme;
	}
}
