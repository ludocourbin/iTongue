import React from 'react';
import { Route, Switch} from 'react-router-dom';

/* Styles */
import 'semantic-ui-css/semantic.min.css'
import './app.scss';

/* Components */
import Admin from '../Admin';

const App = () => {
    return (
        <div className="App">
            
            <Switch>
                <Route path="/" exact>
                    {/* <Home /> */}
                </Route>

                <Route path="/signup">
                    {/* <Signup />*/}
                </Route>

                <Route path="/login">
                    {/* <Login />*/}
                </Route>

                <Route path="/admin" component={Admin} />

                <Route>
                    <h1>La page n'existe pas</h1>
                </Route>
            </Switch>
        </div>
    );
};

export default App;