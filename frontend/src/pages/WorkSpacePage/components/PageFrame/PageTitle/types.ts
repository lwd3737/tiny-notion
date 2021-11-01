import { KeyboardEvent, MouseEvent } from "react";

export type PageTitleContainerProps = {
	title: string | null;
	isFocused: boolean;
	onKeyUp: (e: KeyboardEvent) => void;
	onKeyDown: (e: KeyboardEvent) => void;
	onClick: (e: MouseEvent) => void;
};
