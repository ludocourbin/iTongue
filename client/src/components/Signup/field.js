import React from "react";
import { Input } from "semantic-ui-react";

const Field = ({ label, id, placeholder }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <Input
                className="signup-input--item"
                fluid={true}
                id={id}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Field;
