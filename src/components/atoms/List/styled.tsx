import styled, { css } from "styled-components";
import { getBlockTheme } from "../../../utils/theme";
import defaultListTheme from "./theme";

export const Root = styled.ul`
	list-style: none;

	${({ theme }) => {
		const { block, background } = theme ?? {};

		return css`
			${background?.color ?? defaultListTheme.background.color}
			${getBlockTheme(block, defaultListTheme.block)};
		`;
	}}
`;
