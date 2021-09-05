import { PAGES } from "src/dummy";
import PageNavigation from "./PageNavigation";
import * as S from "./styled";
import { SideBarProps } from "./type";

const SideBar: React.FC<SideBarProps> = ({}) => {
	return (
		<S.Root>
			<PageNavigation pages={PAGES} />
		</S.Root>
	);
};

export default SideBar;
