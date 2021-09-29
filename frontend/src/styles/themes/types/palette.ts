import "styled-components";

import { Color, Length } from ".";

export const PaletteThemeSymbol = Symbol("PaletteTheme");

export type PaletteTheme = {
	colors?: {
		background?: {
			light?: Color;
		};
		icon?: Color;
		text?: {
			normal?: Color;
			sideBar?: Color;
		};
		hover?: Color;
		placeHolder: {
			title?: Color;
			block?: Color;
		};
	};
	sizes?: {
		text?: {
			normal?: Length;
			h1?: Length;
			h2?: Length;
			h3?: Length;
		};
	};
};

declare module "styled-components" {
	interface DefaultTheme {
		[PaletteThemeSymbol]: PaletteTheme;
	}
}
