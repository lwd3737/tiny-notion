import { ChangeEvent, memo, useCallback, useEffect, useRef } from "react";

import * as S from "./styled";
import { TextInputContainerProps } from "./types";

const TextInputContainer = ({
	isFocused,
	value,
	placeHolder,
	onTextChange,
	onKeyDown,
	onFocus,
	onClick,
}: TextInputContainerProps) => {
	let ref = useRef<HTMLInputElement>(null);

	const autoSize = useCallback(() => {
		if (ref && ref.current) {
			const $el = ref.current;

			$el.style.height = "fit-content";

			const { scrollHeight } = $el;

			$el.style.height = `${scrollHeight}px`;
		}
	}, []);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onTextChange(e.target.value);
			autoSize();
		},
		[autoSize, onTextChange],
	);

	const _onClick = useCallback(() => {}, []);

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
			value={value}
			placeholder={isFocused ? placeHolder : ""}
			onChange={onChange}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			onClick={onClick}
		/>
	);
};

export default memo(TextInputContainer);
