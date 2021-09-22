import { css } from "styled-components";
import {
	Block,
	Color,
	Text,
	Length,
	Side,
	BorderTheme,
	ContentSizeTheme,
	MinMaxLength,
} from "styles/themes/types/units";

export const convertColorToString = (color?: Color) => {
	if (typeof color === "undefined") return;
	if (typeof color === "string") return color;
	if ("a" in color) {
		const { r, g, b, a } = color;

		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}

	const { r, g, b } = color;

	return `rgb(${r}, ${g}, ${b})`;
};

export const convertLengthToString = (length?: Length) => {
	if (typeof length === "undefined") return;
	if (typeof length === "number") return `${length}px`;
	if (typeof length === "string") return length;
};

export const convertSideToString = (
	side?: Side,
	numberToString?: (num: number) => string,
) => {
	if (typeof side === "undefined") return;

	if (typeof side === "number")
		return numberToString ? numberToString(side) : convertLengthToString(side);
	if (typeof side === "string") return side;

	if ("horizontal" in side || "vertical" in side) {
		return `${convertLengthToString(side.vertical) ?? 0} ${
			convertLengthToString(side.horizontal) ?? 0
		}`;
	}

	if ("top" in side || "right" in side || "bottom" in side || "left" in side) {
		return `${convertLengthToString(side.top) ?? 0} ${
			convertLengthToString(side.right) ?? 0
		} ${convertLengthToString(side.bottom) ?? 0} ${
			convertLengthToString(side.left) ?? 0
		}`;
	}
};

export const isMinMaxLength = (unit: any): unit is MinMaxLength => {
	if (
		typeof unit === "object" &&
		("normal" in unit || "min" in unit || "max" in unit)
	)
		return true;
	return false;
};

export const convertContentSizeThemeToCSS = (
	contentSizeTheme?: ContentSizeTheme,
	defaultContentSizeTheme?: ContentSizeTheme,
): ReturnType<typeof css> => {
	if (isMinMaxLength(contentSizeTheme)) {
		const defaultTheme = isMinMaxLength(defaultContentSizeTheme)
			? defaultContentSizeTheme
			: undefined;

		return css`
			width: ${convertLengthToString(
				contentSizeTheme?.normal ?? defaultTheme?.normal,
			)};
			min-width: ${convertLengthToString(
				contentSizeTheme?.min ?? defaultTheme?.min,
			)};
			max-width: ${convertLengthToString(
				contentSizeTheme?.max ?? defaultTheme?.max,
			)};
		`;
	}

	const defaultTheme = isMinMaxLength(defaultContentSizeTheme)
		? undefined
		: defaultContentSizeTheme;

	return css`
		width: ${convertLengthToString(contentSizeTheme ?? defaultTheme)};
	`;
};

export const convertBorderThemeToCSS = (
	borderTheme?: BorderTheme,
	defaultBorderTheme?: BorderTheme,
): ReturnType<typeof css> => {
	const radius = borderTheme?.radius ?? defaultBorderTheme?.radius;
	const width = borderTheme?.width ?? defaultBorderTheme?.width;
	const style = borderTheme?.style ?? defaultBorderTheme?.style;

	return css`
		border-radius: ${convertLengthToString(radius)};
		border-width: ${convertLengthToString(width)};
		border-style: ${style};
	`;
};

export const convertBlockThemeToCSS = (
	blockTheme: Block | undefined,
	defaultBlockTheme?: Block,
): ReturnType<typeof css> => {
	const width = blockTheme?.width ?? defaultBlockTheme?.width;
	const height = blockTheme?.height ?? defaultBlockTheme?.height;
	const margin = blockTheme?.margin ?? defaultBlockTheme?.margin;
	const padding = blockTheme?.padding ?? defaultBlockTheme?.padding;
	const border = blockTheme?.border ?? defaultBlockTheme?.border;

	return css`
		margin: ${convertSideToString(margin)};
		padding: ${convertSideToString(padding)};
		border: ${border};
		width: ${convertContentSizeThemeToCSS(width)};
		height: ${convertContentSizeThemeToCSS(height)};
	`;
};

export const convertTextThemeToCSS = (
	textTheme: Text | undefined,
	defaultTextTheme?: Text,
): ReturnType<typeof css> => {
	const size = textTheme?.size ?? defaultTextTheme?.size;
	const color = textTheme?.color ?? defaultTextTheme?.color;
	const weight = textTheme?.weight ?? defaultTextTheme?.weight;

	return css`
		font-size: ${size};
		font-weight: ${weight};
		color: ${color};
	`;
};
