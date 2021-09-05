export type Length = string | number;

export type MinMaxLength = {
	normal?: Length;
	min?: Length;
	max?: Length;
};

export type Side =
	| number
	| string
	| { horizontal?: Length; vertical?: Length }
	| { top?: Length; right?: Length; bottom?: Length; left?: Length };

export type Border = {
	radius?: Length;
	width?: Length;
	style?: string;
};

export type Block = {
	width?: Length | MinMaxLength;
	height?: Length | MinMaxLength;
	border?: Border;
	margin?: Side;
	padding?: Side;
};

export type Color = string | { r: number; g: number; b: number; a?: number };

export type Background = {
	color?: Color;
};
