import { useGetFocusedSectionQuery } from "generated/graphql";

export const usePageFrame = () => {
	const { data: focusedSectionData } = useGetFocusedSectionQuery();
	const focusedSection = focusedSectionData?.focusedSection ?? null;

	return {
		focusedSection,
	};
};
