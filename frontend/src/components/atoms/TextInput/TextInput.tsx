import { memo, useEffect, useRef } from "react";

import * as S from "./styled";
import { TextInputContainerProps } from "./types";

const TextInputContainer = ({
	isFocused,
	value,
	placeholder,
	onKeyUp,
	onKeyDown,
	onFocus,
	onClick,
	...props
}: TextInputContainerProps) => {
	let ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const triggerFocus = () => {
			if (isFocused && ref && ref.current) {
				ref.current.focus();
			}
		};

		triggerFocus();
	}, [isFocused]);

	return (
		<S.TextInput
			ref={ref}
			isPlaceholderShown={value === null && isFocused}
			placeholder={placeholder}
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			onClick={onClick}
			data-content-editable-leaf={true}
			contentEditable
			suppressContentEditableWarning
			{...props}
		></S.TextInput>
	);
};

export default memo(TextInputContainer);
