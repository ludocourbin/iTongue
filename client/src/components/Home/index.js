import React from "react";
import { ToastContainer } from "react-toastify";
// import './home.scss';

/* Components */
import Layout from "../../containers/Layout";

const Home = () => {
    return (
        <Layout>
            <ToastContainer autoClose={2000} />
        </Layout>
    );
};

export default Home;
