import usePage from "./hooks/usePage";

import { PageContent } from "./PageContent";
import { PageTitle } from "./PageTitle";
import * as S from "./styled";

const PageFrame = () => {
	const {
		focusedTarget,
		pageTitle: { title, onTitleClick, onTitleKeyUp, onTitleKeyDown },
		pageContent: {
			blocksMeta,
			blocksContent,
			focusedBlockIndex,
			onContentFocus,
			onContentBlur,
			onBlockKeyUp,
			onBlockKeyDown,
			onBlockClick,
		},
	} = usePage();

	return (
		<S.PageFrame>
			<PageTitle
				isFocused={focusedTarget === "title"}
				title={title}
				onKeyUp={onTitleKeyUp}
				onKeyDown={onTitleKeyDown}
				onClick={onTitleClick}
			/>
			<PageContent
				isFocused={focusedTarget === "content"}
				blocksMeta={blocksMeta}
				blocksContent={blocksContent}
				focusedBlockIndex={focusedBlockIndex}
				onContentFocus={onContentFocus}
				onContentBlur={onContentBlur}
				onBlockKeyUp={onBlockKeyUp}
				onBlockKeyDown={onBlockKeyDown}
				onBlockClick={onBlockClick}
			/>
		</S.PageFrame>
	);
};

export default PageFrame;
