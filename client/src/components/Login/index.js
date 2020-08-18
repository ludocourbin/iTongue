import React from 'react';
import { Container, Button, Input, Form, Checkbox, Icon } from 'semantic-ui-react';
import Header from "../../containers/Header";
import { ToastContainer } from "react-toastify";
import './style.scss';


const Login = ({
    // data qui vient du state
    loginData,
    loading,
    showPassword,
    // Fonctions qui dispatchent
    onInputChange,
    togglePassword,
    login,
}) => {
    const {
        email,
        password,
        stayConnected,
    } = loginData;
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("onSubmit");
        login();
    };

    const handleChange = (evt, data) => {
        const { name, value,id } = evt.target;

        onInputChange({
            [name || id ]: value || data.checked || "" || false,
        });
    };

    return (
        <Header>
            <Container>       
            {loading && <ToastContainer autoClose={2000} />}  
                <Form className="login-form" onSubmit={handleSubmit}>
                    <h3 className="login-title"> Connectez-vous</h3> 
                    <Form.Field control={Input}
                        label="Email"
                        type="email"
                        width={16}
                        name="email"
                        onChange={handleChange}
                        value={email}
                        placeholder="john@example.com"
                        />
                    <Form.Field
                        control={Input}
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        width={16}
                        name="password"
                        onChange={handleChange}
                        value={password}
                        icon={
                            <Icon
                                name={showPassword ? "eye slash" : "eye"}
                                onClick={togglePassword}
                                link
                            />
                        }
                        placeholder="**********"
                    />
                    <Form.Field>
                        <Checkbox checked={stayConnected} onClick={handleChange} 
                        label='Restez connecté' id="stayConnected" />
                    </Form.Field>
                    <Button className="login-button" type='submit'>Connectez-vous</Button>
                </Form>
                
            </Container>
        </Header>
    )
};
export default Login;