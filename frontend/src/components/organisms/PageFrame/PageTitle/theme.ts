import defaultTextInputTheme from "components/atoms/TextInput/theme";
import { TextInputThemeSymbol } from "components/atoms/TextInput/types";
import defaultPaletteTheme from "styles/themes/palette";
import { extendTheme } from "utils/themeUtils";

export const PageTitleTheme = {
	[TextInputThemeSymbol]: extendTheme(defaultTextInputTheme, {
		content: {
			text: {
				size: defaultPaletteTheme.sizes?.text?.h1,
			},
		},
		placeHolder: {
			size: defaultPaletteTheme.sizes?.text?.h1,
			color: defaultPaletteTheme.colors?.placeHolder?.title,
		},
	}),
};
