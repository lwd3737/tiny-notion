export type BlockContent = {
	id: string;
	content: TextBlockContent;
};

export type TextBlockContent = {
	value: string;
};

export type BlocksContent = {
	[id: string]: BlockContent;
} | null;
