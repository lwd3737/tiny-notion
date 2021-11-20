import { InMemoryCache } from "@apollo/client";

const typePolicies = {
	Query: {
		fields: {},
	},
};

const cache: InMemoryCache = new InMemoryCache({
	typePolicies,
});

export default cache;
