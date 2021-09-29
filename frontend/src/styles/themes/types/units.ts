export type Length = string | number;

export type MinMaxLength = {
	normal?: Length;
	min?: Length;
	max?: Length;
};

export type ContentSizeTheme = MinMaxLength | Length;

export type Side =
	| number
	| string
	| { horizontal?: Length; vertical?: Length }
	| { top?: Length; right?: Length; bottom?: Length; left?: Length };

export type BorderTheme = {
	radius?: Length;
	width?: Length;
	style?: string;
};

export type BlockTheme = {
	width?: Length | ContentSizeTheme;
	height?: Length | ContentSizeTheme;
	border?: BorderTheme;
	margin?: Side;
	padding?: Side;
};

export type Color = string | { r: number; g: number; b: number; a?: number };

export type Background = {
	color?: Color;
};

export type TextTheme = {
	size?: Length;
	color?: Color;
	weight?: number | string;
};
