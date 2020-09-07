import React from 'react';
import Layout from '../../containers/Layout'
import { Image, Button } from "semantic-ui-react";
import Lottie from 'react-lottie';
import animationData from './404.json';
import './notfound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        <Layout titlePage="404">
            <div className="notfound">

                <Lottie 
                    options={defaultOptions}
                    height={"50%"}
                    width={"70%"}
                />
                <div className="notfound-oups">
                    Oups..
                </div>
                <div className="notfound-back">
                    <Link to="/">
                        <Button content="Back to home" className="notfound-back_btn"/>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default NotFound;