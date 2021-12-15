import { useReactiveVar } from "@apollo/client";
import { blocksContentVar } from "cache";

export const useGetBlocksContent = () => {
	return useReactiveVar(blocksContentVar);
};
