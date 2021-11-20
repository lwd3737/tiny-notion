import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type QueryKeySpecifier = ('test' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	test?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestKeySpecifier = ('text' | TestKeySpecifier)[];
export type TestFieldPolicy = {
	text?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Test?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestKeySpecifier | (() => undefined | TestKeySpecifier),
		fields?: TestFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;