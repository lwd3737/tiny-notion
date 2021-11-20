import * as S from "./styled";
import { BlockProps } from "./types";

const BlockContainer = ({ children, id }: BlockProps): JSX.Element => {
	return (
		<S.Block className="block" data-block-id={id}>
			{children}
		</S.Block>
	);
};

export default BlockContainer;
