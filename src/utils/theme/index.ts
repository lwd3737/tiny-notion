import { css } from "styled-components";
import { Block } from "styles/themes/types";

export const getBlockTheme = (
	theme: Block | undefined,
	defaultTheme: Block,
): ReturnType<typeof css> => {
	const width = theme?.width ?? defaultTheme.width;
	const height = theme?.height ?? defaultTheme.height;
	const margin = theme?.margin ?? defaultTheme.margin;
	const padding = theme?.padding ?? defaultTheme.padding;
	const border = theme?.border ?? defaultTheme.border;

	return css`
		width: ${width};
		height: ${height};
		margin: ${margin};
		padding: ${padding};
		border: ${border};
	`;
};
