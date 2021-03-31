import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Types from './pages/Types'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={SignIn} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/types" component={Types} />
        </BrowserRouter>
    )
}

export default Routes;