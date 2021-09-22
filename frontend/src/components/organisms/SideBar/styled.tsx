import styled from "styled-components";
import { PaletteThemeSymbol } from "styles/themes/types";
import { convertColorToString } from "utils/themeUtils";

export const SideBar = styled.div`
	height: 100%;
	background-color: ${({ theme }) =>
		convertColorToString(theme[PaletteThemeSymbol].colors?.background?.light)};
`;
