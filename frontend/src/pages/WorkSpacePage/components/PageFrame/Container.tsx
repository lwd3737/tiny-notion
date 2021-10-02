import { useCallback, useState } from "react";
import { PageContent } from "./PageContent";
import { PageTitle } from "./PageTitle";
import * as S from "./styled";

const PageFrameContainer = () => {
	const [focusTarget, setFocusTarget] = useState<"title" | "content" | null>(
		null,
	);
	const onContentFocus = useCallback(() => {
		setFocusTarget("content");
	}, []);

	const onTitleFocus = useCallback(() => {
		setFocusTarget("title");
	}, []);

	return (
		<S.PageFrame>
			<PageTitle
				isFocused={focusTarget === "title"}
				onContentFocus={onContentFocus}
			/>
			<PageContent
				isFocused={focusTarget === "content"}
				onTitleFocus={onTitleFocus}
			/>
		</S.PageFrame>
	);
};

export default PageFrameContainer;
