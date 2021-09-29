import defaultPaletteTheme from "styles/themes/palette";
import { TextInputTheme } from "./types";

const defaultTextInputTheme: TextInputTheme = {
	content: {
		text: {
			color: defaultPaletteTheme.colors?.text?.normal,
		},
	},
	placeHolder: {
		color: defaultPaletteTheme.colors?.placeHolder.block,
	},
};

export default defaultTextInputTheme;
