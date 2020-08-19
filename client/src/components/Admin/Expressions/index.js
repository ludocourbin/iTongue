import React from 'react';
import { ToastContainer } from "react-toastify";

/* Style */
import './expressions.scss';

/* Containers */
import ExpressionsList from '../../../containers/Admin/Expressions/ExpressionsList';
import ExpressionsResult from '../../../containers/Admin/Expressions/ExpressionsResult';
import HeaderAdmin from '../HeaderAdmin';

const Expressions = () => {

    return (
        <HeaderAdmin>
            <div className="expressions">
                <ToastContainer autoClose={2000} />
                <ExpressionsList />
                <ExpressionsResult />
            </div>
        </HeaderAdmin>
    );
};

export default Expressions;