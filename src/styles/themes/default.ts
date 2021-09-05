import { ListThemeSet, ListThemeSymbol } from "src/components/atoms/List/type";
import { DefaultTheme } from "styled-components";

const listTheme: ListThemeSet = {
	secondary: {
		background: {
			color: "red",
		},
	},
};

const defaultTheme: DefaultTheme = {
	[ListThemeSymbol]: listTheme,
};

export default defaultTheme;
