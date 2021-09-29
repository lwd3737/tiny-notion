import { css } from "styled-components";
import { PaletteThemeSymbol } from "styles/themes/types";
import { convertColorToString } from "utils/themeUtils";

export const HoverStyle = css`
	&:hover {
		background-color: ${({ theme }) =>
			convertColorToString(theme[PaletteThemeSymbol]?.colors?.hover)};
		cursor: pointer;
	}
`;
