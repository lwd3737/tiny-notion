import { MouseEventHandler } from "react";

export type Block = {
	id: string;
	type: "text" | "toggle" | "todo";
};

export type BlocksContent = {
	[id: string]: any;
};

export type PageContentContainerProps = {
	isFocused: boolean;
	onTitleFocus: () => void;
	onBlockClick: () => void;
};
