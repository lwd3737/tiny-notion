import { MouseEventHandler } from "react";

export type PageTitleContainerProps = {
	isFocused: boolean;
	onContentFocus: () => void;
	onClick: MouseEventHandler;
};
