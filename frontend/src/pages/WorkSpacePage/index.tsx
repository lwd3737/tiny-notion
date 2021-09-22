import { useMemo } from "react";
import { SideBar } from "../../components/organisms";
import { WorkSpaceLayout } from "../../components/templates";

type WorkSpacePageProps = {};

const WorkSpacePage: React.VFC<WorkSpacePageProps> = ({}) => {
	const _SideBar = useMemo(() => <SideBar />, []);

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
