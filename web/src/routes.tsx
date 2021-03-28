import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={SignIn} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
        </BrowserRouter>
    )
}

export default Routes;