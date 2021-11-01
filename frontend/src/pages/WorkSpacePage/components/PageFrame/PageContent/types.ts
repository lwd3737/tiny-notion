import { KeyboardEvent } from "react";

export type PageContentContainerProps = {
	isFocused: boolean;
	blocksMeta: BlockMeta[] | null;
	blocksContent: BlocksContent | null;
	focusedBlockIndex: number | null;
	onContentFocus: () => void;
	onContentBlur: () => void;
	onBlockKeyUp: (e: KeyboardEvent, id: string) => void;
	onBlockKeyDown: (e: KeyboardEvent) => void;
	onBlockClick: (index: number) => void;
};

export type BlockType = "text" | "toggle" | "todo";

export type BlockMeta = {
	id: string;
	index: number;
	type: BlockType;
};

export type BlocksContent = {
	[id: string]: any;
};
