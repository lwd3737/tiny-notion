import { memo, useEffect, useRef } from "react";

import * as S from "./styled";
import { TextInputProps } from "./types";

const TextInput = ({
	isFocused,
	value,
	placeholder,
	contentEditable,
	onKeyDown,
	onFocus,
	onClick,
	...props
}: TextInputProps) => {
	let ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const triggerFocus = () => {
			if (isFocused && ref && ref.current) {
				ref.current.focus();
			}
		};

		triggerFocus();
	}, [isFocused]);

	useEffect(() => {
		if (!ref) return;
		if (!ref.current) return;

		ref.current.innerHTML = value ?? "";
	}, [value]);

	return (
		<S.TextInput
			ref={ref}
			isPlaceholderShown={value === null && isFocused}
			placeholder={placeholder}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			onClick={onClick}
			data-content-editable-leaf
			contentEditable
			suppressContentEditableWarning
			{...props}
		></S.TextInput>
	);
};

export default memo(TextInput);
