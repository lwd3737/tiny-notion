import * as S from "./styled";
import PageNavigation from "./PageNavigation/Container";
import { SideBarProps } from "./types";

const SideBarContainer: React.FC<SideBarProps> = ({}) => {
	return (
		<S.SideBar>
			<PageNavigation
				pages={[
					{ title: "page1" },
					{ title: "page2" },
					{ title: "page3" },
					{ title: "page4" },
					{ title: "page5" },
					{ title: "page6" },
				]}
			/>
		</S.SideBar>
	);
};

export default SideBarContainer;
