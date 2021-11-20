import { ReactNode } from "react";
import * as S from "./styled";

type WorkSpaceLayoutProps = {
	SideBar: ReactNode;
	Header: ReactNode;
	Contents: ReactNode;
};

const WorkSpaceLayout: React.FC<WorkSpaceLayoutProps> = ({
	SideBar,
	Header,
	Contents,
}) => {
	return (
		<S.WorkSpaceLayout>
			<S.SideBar>{SideBar}</S.SideBar>
			<S.Main>
				<S.Header>{Header}</S.Header>
				<S.Contents>{Contents}</S.Contents>
			</S.Main>
		</S.WorkSpaceLayout>
	);
};

export default WorkSpaceLayout;
