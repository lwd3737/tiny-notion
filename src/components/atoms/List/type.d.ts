import "styled-components";
import { ReactNode } from "react";
import { Background, Block } from "src/styles/themes/types";

export type ListProps<Item> = {
	data: Item[];
	renderItem: (item: Item) => ReactNode;
};

//theme
export const ListThemeSymbol = symbol("ListTheme");

export type ListTheme = {
	block?: Block;
	background?: Background;
};

export type ListThemeSet = {
	default?: ListTheme;
	[theme: string]: ListTheme;
};

declare module "styled-components" {
	interface DefaultTheme {
		[ListTheme]?: ListThemeSet;
	}
}
