import { ReactNode } from "react";
import * as S from "./styled";

type GlobalLayoutProps = {
	SideBar: ReactNode;
	Header: ReactNode;
	Contents: ReactNode;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({
	SideBar,
	Header,
	Contents,
}) => {
	return (
		<S.Root>
			<S.SideBar>{SideBar}</S.SideBar>
			<S.Main>
				<S.Header>{Header}</S.Header>
				<S.Contents>{Contents}</S.Contents>
			</S.Main>
		</S.Root>
	);
};

export default GlobalLayout;
