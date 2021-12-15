export type BlockContent = {
	id: string;
	content: any;
};

export type BlocksContent = {
	[id: string]: BlockContent;
} | null;
