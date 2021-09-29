import WorkSpaceLayout from "components/templates/WorkSpaceLayout";
import { PageHeader } from "components/organisms/PageHeader";
import { SideBar } from "components/organisms";
import { PageFrame } from "components/organisms/PageFrame";

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
