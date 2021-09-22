import styled, { css } from "styled-components";
import { convertBlockThemeToCSS } from "../../../utils/themeUtils";
import defaultListTheme from "./theme";
import { ListThemeSymbol } from "./types";

export const List = styled.ul`
	list-style: none;

	${({ theme }) =>
		convertBlockThemeToCSS(
			theme[ListThemeSymbol]?.block,
			defaultListTheme.block,
		)};
`;
