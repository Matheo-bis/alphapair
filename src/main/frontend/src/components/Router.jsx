import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = Component => props => {
    const location = useLocation();
    const match = { params: useParams() };
    const history = useNavigate();
    return <Component location={location} match={match} history={history} {...props} />;
  };

export default withRouter;