import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* Components */ 
import Expressions from './Expressions';
import HeaderAdmin from './HeaderAdmin';
import HomeAdmin from './HomeAdmin';

/* Styles */
import './admin.scss';

const Admin = () => {

    return (
        <div className="admin">
            <HeaderAdmin />
            <Switch>
                <Route path="/admin/expressions" exact component={Expressions} />
                <Route path="/admin" exact component={HomeAdmin} />
                <Route>
                    Cette page Admin n'existe pas
                </Route>
            </Switch>
        </div>
    );
};

export default Admin;