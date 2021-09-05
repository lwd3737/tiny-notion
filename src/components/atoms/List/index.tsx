import { memo } from "react";

import * as S from "./styled";
import { ListProps } from "./type";

const List = <Item,>({ data, renderItem }: ListProps<Item>) => {
	return <S.Root>{data && data.map((item) => renderItem(item))}</S.Root>;
};

export default memo(List);
