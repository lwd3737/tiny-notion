import { memo } from "react";

import { TextInput } from "components/atoms/TextInput";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { PageTitleTheme } from "./theme";
import { PageTitleProps } from "./types";
import * as S from "./styled";
import { useTitle } from "./hooks";

const PageTitle = ({ isFocused }: PageTitleProps): JSX.Element => {
	const { title, onTitleClick, onTitleKeyDown, onTitleKeyUp } = useTitle();

	return (
		<ThemeProvider
			theme={(theme: DefaultTheme) => ({
				...theme,
				...PageTitleTheme,
			})}
		>
			<S.PageTitle>
				<S.PageControls>controls</S.PageControls>
				<TextInput
					isFocused={isFocused}
					value={title}
					placeholder="제목 없음"
					onKeyUp={onTitleKeyUp}
					onKeyDown={onTitleKeyDown}
					onClick={onTitleClick}
				/>
			</S.PageTitle>
		</ThemeProvider>
	);
};

export default memo(PageTitle);
