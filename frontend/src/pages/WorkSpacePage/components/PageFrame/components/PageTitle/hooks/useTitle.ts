import { useGetTitleQuery } from "generated/graphql";
import { useTitleClick, useTitleKeyDown } from ".";

export const useTitle = () => {
	const { data: titleData } = useGetTitleQuery();
	const title = titleData?.title ?? null;

	const onTitleClick = useTitleClick();
	const onTitleKeyDown = useTitleKeyDown();
	const onTitleKeyUp = useTitleKeyDown();

	return {
		title,
		onTitleClick,
		onTitleKeyDown,
		onTitleKeyUp,
	};
};
