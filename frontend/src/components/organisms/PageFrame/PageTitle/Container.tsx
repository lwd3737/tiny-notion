import { useCallback, useEffect, useState } from "react";

import { TextInput } from "components/atoms/TextInput";
import * as S from "./styled";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { PageTitleTheme } from "./theme";
import { PageTitleContainerProps } from "./types";

const PageTitleContainer = ({
	isFocused,
	onKeyDown,
}: PageTitleContainerProps): JSX.Element => {
	const [text, setText] = useState<string>("");

	const onTextChnage = useCallback((text: string) => {
		setText(text);
	}, []);

	useEffect(() => {
		const focus = () => {};

		focus();
	}, [isFocused]);

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
					value={text}
					placeHolder="제목 없음"
					onTextChange={onTextChnage}
					onKeyDown={onKeyDown}
				/>
			</S.PageTitle>
		</ThemeProvider>
	);
};

export default PageTitleContainer;
