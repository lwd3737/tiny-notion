import defaultPaletteTheme from "styles/themes/palette";
import { ToggleItemTheme } from "./types";

const defaultToggleItemTheme: ToggleItemTheme = {
	block: {
		padding: { horizontal: 14, vertical: 2 },
	},
	text: {
		color: defaultPaletteTheme.colors?.text?.normal,
		size: "1rem",
	},
};

export default defaultToggleItemTheme;
