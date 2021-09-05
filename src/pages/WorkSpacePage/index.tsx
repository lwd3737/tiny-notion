import { useMemo } from "react";
import SideBarHeader from "../../components/organisms/SideBar/SideBarHeader";
import { WorkSpaceLayout } from "../../components/templates";

type WorkSpacePageProps = {};

const WorkSpacePage: React.VFC<WorkSpacePageProps> = ({}) => {
	const _SideBar = useMemo(() => <SideBarHeader />, []);

	//const _Header = useMemo(() => (<Header />), [])

	return (
		<WorkSpaceLayout
			SideBar={_SideBar}
			Header={<>header</>}
			Contents={<>Contents</>}
		/>
	);
};

export default WorkSpacePage;
