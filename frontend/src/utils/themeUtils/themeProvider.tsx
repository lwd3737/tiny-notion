import { DefaultTheme, ThemeProvider } from "styled-components";

export const createThemeProvider: React.FC<{
	themeName: keyof DefaultTheme;
	theme: DefaultTheme[keyof DefaultTheme];
}> = ({ children, themeName, theme }) => {
	return (
		<ThemeProvider
			theme={(globalTheme: DefaultTheme) => ({
				...globalTheme,
				[themeName]: theme,
			})}
		>
			{children}
		</ThemeProvider>
	);
};
