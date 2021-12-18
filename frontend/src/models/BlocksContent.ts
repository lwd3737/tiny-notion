export type BlockContent = {
	id: string;
	content: string;
};

export type BlocksContent = {
	[id: string]: BlockContent;
} | null;
