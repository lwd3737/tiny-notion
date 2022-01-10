import * as S from "./styled";
import { BlockProps } from "./types";

const Block = ({ children, id }: BlockProps): JSX.Element => {
	return (
		<S.Block className="block" data-block-id={id}>
			{children}
		</S.Block>
	);
};

export default Block;
