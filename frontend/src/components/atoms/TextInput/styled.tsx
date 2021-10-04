import styled from "styled-components";
import { convertTextThemeToCSS } from "utils/themeUtils";
import defaultTextInputTheme from "./theme";
import { TextInputThemeSymbol } from "./types";

export const TextInput = styled.div`
	resize: none;
	border: none;
	width: 100%;
	height: fit-content;

	${({ theme }) =>
		convertTextThemeToCSS(
			theme[TextInputThemeSymbol]?.content?.text,
			defaultTextInputTheme?.content?.text,
		)};

	&:focus {
		outline: none;
	}

	&::placeholder {
		${({ theme }) =>
			convertTextThemeToCSS(
				theme[TextInputThemeSymbol]?.placeHolder,
				defaultTextInputTheme?.placeHolder,
			)};
	}
`;

export const Text = styled.p``;

export const PlaceHolder = styled.div``;
