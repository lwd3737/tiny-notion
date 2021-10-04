import "styled-components";
import { RequiredPaletteTheme } from "./types";

const BLACK = { r: 55, g: 53, b: 47 };
const GRAY = { r: 25, g: 23, b: 17, a: 0.6 };
const PASTEL_PEACH = { r: 246, g: 246, b: 243 };

const defaultPaletteTheme: RequiredPaletteTheme = {
	colors: {
		background: {
			light: PASTEL_PEACH,
		},
		icon: { ...BLACK, a: 0.6 },
		text: {
			normal: BLACK,
			sideBar: GRAY,
		},
		hover: { ...BLACK, a: 0.08 },
		placeHolder: {
			title: { ...BLACK, a: 0.15 },
			content: { ...BLACK, a: 0.4 },
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
