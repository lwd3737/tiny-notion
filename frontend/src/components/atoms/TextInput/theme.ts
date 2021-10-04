import defaultPaletteTheme from "styles/themes/palette";
import { TextInputTheme } from "./types";

const { colors, sizes } = defaultPaletteTheme;

const defaultTextInputTheme: TextInputTheme = {
	content: {
		text: {
			color: colors?.text?.normal,
			size: sizes.text.normal,
		},
	},
	placeHolder: {
		color: colors?.placeHolder?.content,
	},
};

export default defaultTextInputTheme;
