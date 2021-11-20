import { memo } from "react";

import * as S from "./styled";
import { ToggleItemContainerProps } from "./types";

const ToggleItemContainer = ({
	children,
	isToggled,
	onClick,
}: ToggleItemContainerProps): JSX.Element => {
	return (
		<S.ToggleItem onClick={onClick}>
			{isToggled ? <S.SortDown /> : <S.SortRight />}
			<S.Text>{children}</S.Text>
		</S.ToggleItem>
	);
};

export default memo(ToggleItemContainer);
