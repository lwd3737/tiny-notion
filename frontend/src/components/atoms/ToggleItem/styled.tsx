import styled, { css } from "styled-components";

import { ReactComponent as SortRightSVG } from "assets/icons/sort-right.svg";
import { ReactComponent as SortDownSVG } from "assets/icons/sort-down.svg";
import {
	convertBlockThemeToCSS,
	convertColorToString,
	convertTextThemeToCSS,
} from "utils/themeUtils";
import { PaletteThemeSymbol } from "styles/themes/types";
import { ToggleItemThemeSymbol } from "./types";
import defaultToggleItemTheme from "./theme";
import { HoverStyle } from "styles/styled";

const SortStyle = css`
	width: 20px;
	height: 20px;
	margin-right: 5px;

	color: ${({ theme }) =>
		convertColorToString(theme[PaletteThemeSymbol]?.colors?.icon)};
`;

export const ToggleItem = styled.li`
	list-style: none;
	display: flex;

	${({ theme }) =>
		convertBlockThemeToCSS(
			theme[ToggleItemThemeSymbol]?.block,
			defaultToggleItemTheme.block,
		)};

	${HoverStyle}
`;

export const SortRight = styled(SortRightSVG)`
	${SortStyle}
`;

export const SortDown = styled(SortDownSVG)`
	${SortStyle};
`;

export const Text = styled.div`
	${({ theme }) =>
		convertTextThemeToCSS(
			theme[ToggleItemThemeSymbol]?.text,
			defaultToggleItemTheme.text!,
		)}
`;
