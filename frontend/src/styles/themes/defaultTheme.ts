import { DefaultTheme } from "styled-components";

import defaultPaletteTheme from "./palette";
import { PaletteThemeSymbol } from "./types";

const defaultTheme: DefaultTheme = {
	[PaletteThemeSymbol]: defaultPaletteTheme,
};

export default defaultTheme;
