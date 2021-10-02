import WorkSpaceLayout from "components/templates/WorkSpaceLayout";
import { PageFrame, PageHeader, SideBar } from "./components";

type WorkSpacePageProps = {};

const WorkSpacePage: React.VFC<WorkSpacePageProps> = ({}) => {
	return (
		<WorkSpaceLayout
			SideBar={<SideBar />}
			Header={<PageHeader />}
			Contents={<PageFrame />}
		/>
	);
};

export default WorkSpacePage;
