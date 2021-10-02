import { Block } from "components/atoms/Block";
import { TextBlockContainerProps } from "./types";
import { TextInput } from "components/atoms/TextInput";

const TextBlockContainer = ({
	text,
	isFocused,
	onKeyDown,
	onTextChange,
	onFocus,
	onClick,
}: TextBlockContainerProps): JSX.Element => {
	return (
		<Block>
			<TextInput
				isFocused={isFocused}
				value={text}
				placeHolder={`명령어 사용 시 "/"를 입력하세요`}
				onKeyDown={onKeyDown}
				onTextChange={onTextChange}
				onFocus={onFocus}
				onClick={onClick}
			/>
		</Block>
	);
};

export default TextBlockContainer;
