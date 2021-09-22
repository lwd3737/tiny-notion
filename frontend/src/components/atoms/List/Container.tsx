import { memo } from "react";

import * as S from "./styled";
import { ListContainerProps } from "./types";

const ListContainer = <Item,>({
	data,
	renderItem,
}: ListContainerProps<Item>) => {
	return (
		<S.List>
			{data && data.map((item, index) => renderItem(item, index))}
		</S.List>
	);
};

export default memo(ListContainer);
