import styled, { css } from "styled-components";
import { convertTextThemeToCSS } from "utils/themeUtils";
import defaultTextInputTheme from "./theme";
import { TextInputThemeSymbol } from "./types";

export const TextInput = styled.div<{
	isPlaceholderShown: boolean;
	placeholder: string;
}>`
	display: inline-block;
	width: 100%;

	${({ theme }) =>
		convertTextThemeToCSS(
			theme[TextInputThemeSymbol]?.content?.text,
			defaultTextInputTheme?.content?.text,
		)};

	&:focus {
		outline: none;
	}

	${({ isPlaceholderShown, placeholder }) =>
		isPlaceholderShown &&
		css`
			&::before {
				content: ${placeholder};
			}
		`};

	& div,
	& br {
		display: none;
	}
`;

export const PlaceHolder = styled.div`
	${({ theme }) =>
		convertTextThemeToCSS(
			theme[TextInputThemeSymbol]?.placeHolder,
			defaultTextInputTheme?.placeHolder,
		)};
`;
