import { memo, useCallback, useEffect, useRef } from "react";
import { InputEvent } from ".";

import * as S from "./styled";
import { TextInputContainerProps } from "./types";

const TextInputContainer = ({
	isFocused,
	value,
	placeHolder,
	onInput,
	onKeyDown,
	onFocus,
	onClick,
}: TextInputContainerProps) => {
	let ref = useRef<HTMLDivElement>(null);

	const autoSize = useCallback(() => {
		if (ref && ref.current) {
			const $el = ref.current;

			$el.style.height = "auto";
			$el.style.height = `${$el.scrollHeight}px`;
		}
	}, []);

	const _onInput = useCallback(
		(e: InputEvent) => {
			onInput(e);
			autoSize();
		},
		[autoSize, onInput],
	);

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
			placeholder={isFocused ? placeHolder : ""}
			onInput={_onInput}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			onClick={onClick}
			contentEditable
			suppressContentEditableWarning
		>
			{value}
		</S.TextInput>
	);
};

export default memo(TextInputContainer);
