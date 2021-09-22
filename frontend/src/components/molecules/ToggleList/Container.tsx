import { memo, useCallback, useState } from "react";

import { List } from "components/atoms";
import { ToggleListContainerProps } from "./types";
import { ToggleItem } from "components/atoms/ToggleItem";

const ToggleListContainer = ({
	data,
	itemToText,
}: ToggleListContainerProps): JSX.Element => {
	const [toggledItems, setToggledItems] = useState<boolean[]>(
		data.map((_) => false),
	);

	const handleToggleItemClick = useCallback(
		(index: number) => {
			setToggledItems(
				toggledItems.map((isToggle, _index) =>
					_index === index ? !isToggle : isToggle,
				),
			);
		},
		[toggledItems],
	);

	const renderItem = useCallback(
		(item: any, index: number) => {
			return (
				<ToggleItem
					key={index}
					isToggled={toggledItems[index]}
					onClick={() => handleToggleItemClick(index)}
				>
					{itemToText(item)}
				</ToggleItem>
			);
		},
		[toggledItems, itemToText, handleToggleItemClick],
	);

	return <List data={data} renderItem={renderItem} />;
};

export default memo(ToggleListContainer);
