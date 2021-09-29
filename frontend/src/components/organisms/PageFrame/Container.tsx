import { KeyboardEventHandler, useCallback, useState } from "react";
import { PageContent } from "./PageContent";
import { PageTitle } from "./PageTitle";
import * as S from "./styled";

const PageFrameContainer = () => {
	const [focusTarget, setFocusTarget] = useState<"title" | "content" | null>(
		null,
	);
	const onTitleKeyDown: KeyboardEventHandler = useCallback((e) => {
		if (e.key === "Enter") {
			setFocusTarget("content");
		}
	}, []);

	const onContentKeyDown: KeyboardEventHandler = useCallback((e) => {}, []);

	return (
		<S.PageFrame>
			<PageTitle
				isFocused={focusTarget === "title"}
				onKeyDown={onTitleKeyDown}
			/>
			<PageContent isFocused={focusTarget === "content"} />
		</S.PageFrame>
	);
};

export default PageFrameContainer;
