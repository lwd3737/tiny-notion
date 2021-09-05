import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { WorkSpacePage } from "./pages";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to={ROUTES.workspace} />
				</Route>
				<Route exact path={ROUTES.auth}>
					auth
				</Route>
				<Route path={ROUTES.workspace}>
					<WorkSpacePage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
