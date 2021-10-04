import { memo } from "react";

import { TextInput } from "components/atoms/TextInput";
import * as S from "./styled";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { PageTitleTheme } from "./theme";
import { PageTitleContainerProps } from "./types";

const PageTitleContainer = ({
	isFocused,
	title,
	onInput,
	onKeyDown,
	onClick,
}: PageTitleContainerProps): JSX.Element => {
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
					placeHolder="제목 없음"
					onInput={onInput}
					onKeyDown={onKeyDown}
					onClick={onClick}
				/>
			</S.PageTitle>
		</ThemeProvider>
	);
};

export default memo(PageTitleContainer);
