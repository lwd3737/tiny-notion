import * as S from "./styled";
import { BlockProps } from "./types";

const BlockContainer = ({ children }: BlockProps): JSX.Element => {
	return <S.Block>{children}</S.Block>;
};

export default BlockContainer;
