import "styled-components";

import { Color } from ".";

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
	};
};

declare module "styled-components" {
	interface DefaultTheme {
		[PaletteThemeSymbol]: PaletteTheme;
	}
}
