import React from 'react';
import './homeadmin.scss';
import HeaderAdmin from '../HeaderAdmin';

const HomeAdmin = ( { userConnect }) => {

    console.log("userConnect", userConnect)
    return (
        <HeaderAdmin>
            <div className="home-admin">
                <h3>Page en construction</h3>
            </div>
        </HeaderAdmin>
    );
};

export default HomeAdmin;