import { Block } from "components/atoms/Block";
import { TextBlockProps } from "./types";
import { TextInput } from "components/atoms/TextInput";
import { memo } from "react";

const TextBlock = ({
	id,
	value,
	isFocused,
	onKeyDown,
	onFocus,
	onClick,
}: TextBlockProps): JSX.Element => {
	return (
		<Block id={id}>
			<TextInput
				isFocused={isFocused}
				value={value}
				placeholder={`명령어 사용 시 "/"를 입력하세요`}
				contentEditable
				onKeyDown={onKeyDown}
				onFocus={onFocus}
				onClick={onClick}
			/>
		</Block>
	);
};

export default memo(TextBlock);
