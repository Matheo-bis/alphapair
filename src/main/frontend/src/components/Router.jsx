import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = Component => props => {
    const location = useLocation();
    const params = useParams();
    const history = useNavigate();
    return <Component location={location} params={params} history={history} {...props} />;
  };

export default withRouter;