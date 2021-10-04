import { InputEvent } from "components/atoms/TextInput";
import { KeyboardEventHandler } from "react";

export type PageContentContainerProps = {
	isFocused: boolean;
	blocksMeta: BlockMeta[] | null;
	blocksContent: BlocksContent | null;
	focusedBlockIndex: number | null;
	onContentFocus: () => void;
	onContentBlur: () => void;
	onBlockKeyDown: KeyboardEventHandler;
	onBlockClick: (index: number) => void;
	onTextBlockInput: (e: InputEvent, id: string) => void;
};

export type BlockType = "text" | "toggle" | "todo";

export type BlockMeta = {
	id: string;
	type: BlockType;
};

export type BlocksContent = {
	[id: string]: any;
};
