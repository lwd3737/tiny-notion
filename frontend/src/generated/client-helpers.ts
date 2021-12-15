import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type BlockMetaKeySpecifier = ('id' | 'type' | BlockMetaKeySpecifier)[];
export type BlockMetaFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FocusedBlockKeySpecifier = ('id' | 'index' | FocusedBlockKeySpecifier)[];
export type FocusedBlockFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('blockMeta' | 'blocksMeta' | 'focusedBlock' | 'focusedSection' | 'title' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	blockMeta?: FieldPolicy<any> | FieldReadFunction<any>,
	blocksMeta?: FieldPolicy<any> | FieldReadFunction<any>,
	focusedBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	focusedSection?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	BlockMeta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockMetaKeySpecifier | (() => undefined | BlockMetaKeySpecifier),
		fields?: BlockMetaFieldPolicy,
	},
	FocusedBlock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FocusedBlockKeySpecifier | (() => undefined | FocusedBlockKeySpecifier),
		fields?: FocusedBlockFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;