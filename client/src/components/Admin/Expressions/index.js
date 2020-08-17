import React from 'react';
import { ToastContainer } from "react-toastify";

/* Style */
import './expressions.scss';

/* Containers */
import ExpressionsList from '../../../containers/Admin/Expressions/ExpressionsList';
import ExpressionsResult from '../../../containers/Admin/Expressions/ExpressionsResult';

const Expressions = () => {

    return (
        <div className="expressions">
            <ToastContainer autoClose={2000} />
            <ExpressionsList />
            <ExpressionsResult />
        </div>
    );
};

export default Expressions;