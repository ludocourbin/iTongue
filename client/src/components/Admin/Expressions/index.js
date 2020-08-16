import React from 'react';

/* Style */
import './expressions.scss';

/* Containers */
import ExpressionsList from '../../../containers/Admin/Expressions/ExpressionsList';
import ExpressionsResult from '../../../containers/Admin/Expressions/ExpressionsResult';

const Expressions = () => {

    return (
        <div className="expressions">
            <ExpressionsList />
            <ExpressionsResult />
        </div>
    );
};

export default Expressions;