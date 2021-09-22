import deepmerge from "deepmerge";

export const extendTheme = <Theme>(theme1: Theme, theme2: Theme): Theme => {
	return deepmerge(theme1, theme2);
};

export const mergeAllTheme = <Theme>(
	theme: Theme,
	...themes: Theme[]
): Theme => {
	return deepmerge.all([theme, ...themes]);
};
