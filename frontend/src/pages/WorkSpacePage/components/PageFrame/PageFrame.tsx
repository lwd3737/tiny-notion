//import usePage from "./hooks/usePage";

import { ISection } from "generated/graphql";
import { PageContent } from "./components/PageContent";
import { PageTitle } from "./components/PageTitle";
import { usePageFrame } from "./hooks";
import * as S from "./styled";

const PageFrame = () => {
	const { focusedSection } = usePageFrame();

	return (
		<S.PageFrame>
			<PageTitle isFocused={focusedSection === ISection.Title} />
			<PageContent isFocused={focusedSection === ISection.Content} />
		</S.PageFrame>
	);
};

export default PageFrame;
