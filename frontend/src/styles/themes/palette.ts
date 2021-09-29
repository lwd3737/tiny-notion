import "styled-components";
import { PaletteTheme } from "./types";

const BLACK = { r: 55, g: 53, b: 47 };
const GRAY_1 = { r: 25, g: 23, b: 17, a: 0.6 };
const PASTEL_PEACH = { r: 246, g: 246, b: 243 };

const defaultPaletteTheme: PaletteTheme = {
	colors: {
		background: {
			light: PASTEL_PEACH,
		},
		icon: { ...BLACK, a: 0.6 },
		text: {
			normal: BLACK,
			sideBar: GRAY_1,
		},
		hover: { ...BLACK, a: 0.08 },
		placeHolder: {
			title: { ...BLACK, a: 0.15 },
			block: { ...BLACK, a: 0.4 },
		},
	},
	sizes: {
		text: {
			normal: 16,
			h1: 40,
		},
	},
};

export default defaultPaletteTheme;
