import { InMemoryCache, makeVar } from "@apollo/client";
import { BlocksContent } from "models/BlocksContent";
import { BlocksMeta } from "models/BlocksMeta";
import { FocusedBlock } from "models/FocusedBlock";
import { FocusedSection } from "models/FocusedSection";
import { Title } from "models/Title";

const typePolicies = {
	Query: {
		fields: {
			focusedSection: {
				read() {
					return focusedSectionVar();
				},
			},
			title: {
				read() {
					return titleVar();
				},
			},
			blocksContent: {
				read() {
					return blocksContentVar();
				},
			},
			blocksMeta: {
				read() {
					return blocksMetaVar();
				},
			},
			focusedBlock: {
				read() {
					return focusedBlockVar();
				},
			},
		},
	},
};

const cache: InMemoryCache = new InMemoryCache({
	typePolicies,
});

export default cache;

export const focusedSectionVar = makeVar<FocusedSection>(null);

export const titleVar = makeVar<Title>(null);

export const focusedBlockVar = makeVar<FocusedBlock>(null);

export const blocksContentVar = makeVar<BlocksContent>(null);

export const blocksMetaVar = makeVar<BlocksMeta>(null);
