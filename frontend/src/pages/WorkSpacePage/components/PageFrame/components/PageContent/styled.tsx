import { MouseEvent } from "react";
import styled from "styled-components";
import defaultPaletteTheme from "styles/themes/palette";
import { convertColorToString } from "utils/themeUtils";

export const PageContent = styled.article`
	padding: 0 96px;
`;

export const EmptyTemplate = styled.div`
	padding: 5px 0;
	color: ${convertColorToString(
		defaultPaletteTheme.colors.placeHolder.content,
	)};
`;
