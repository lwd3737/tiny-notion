import { useCallback } from "react";
import { List } from "src/components/atoms";

import * as S from "./styled";
import { PageNavigationProps } from "./type";

const PageNavigation: React.FC<PageNavigationProps> = ({ pages }) => {
	const renderItem = useCallback((item) => {
		return <li>{item.title}</li>;
	}, []);

	return (
		<S.Root>
			<List data={pages} renderItem={renderItem} />
		</S.Root>
	);
};

export default PageNavigation;
