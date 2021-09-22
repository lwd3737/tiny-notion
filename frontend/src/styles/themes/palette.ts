import "styled-components";
import { PaletteTheme } from "./types";

const BLACK = { r: 55, g: 53, b: 47 };
const GRAY_1 = { r: 55, g: 53, b: 47, a: 0.4 };
const GRAY_2 = { r: 25, g: 23, b: 17, a: 0.6 };
const PASTEL_PEACH = { r: 246, g: 246, b: 243 };

const defaultPaletteTheme: PaletteTheme = {
	colors: {
		background: {
			light: PASTEL_PEACH,
		},
		icon: GRAY_1,
		text: {
			normal: BLACK,
			sideBar: GRAY_2,
		},
	},
};

export default defaultPaletteTheme;
