import { ReactiveVar } from "@apollo/client";
import { Title } from "models/Title";

export const createUpdateTitle = (titleVar: ReactiveVar<Title>) => {
	return (title: string | null) => {
		titleVar(title);
	};
};
