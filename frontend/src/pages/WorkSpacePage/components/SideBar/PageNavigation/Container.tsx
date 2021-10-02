import { useCallback } from "react";

import { PageItem, PageNavigationProps } from "./types";
import * as S from "./styled";
import { ToggleList } from "components/molecules";

const PageNavigationContainer = ({
	pages,
}: PageNavigationProps): JSX.Element => {
	const itemToText = useCallback((item: PageItem) => {
		return item.title;
	}, []);

	return (
		<S.PageNavigation>
			<ToggleList data={pages} itemToText={itemToText} />
		</S.PageNavigation>
	);
};

export default PageNavigationContainer;
