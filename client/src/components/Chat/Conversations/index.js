import React, { useEffect } from 'react';
import Layout from '../../../containers/Layout';
import './conversations.scss';
import { Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Conversations = (props) => {

    const sliceText = (text) => {
        return text.slice(0, 44) + "...";
    };

    return (
        <Layout titlePage='Messages'>
            <div className="conversations">
                <div className="conversation">
                    <div className="conversation_container">
                        <Image  className="conversation-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1599001023114"/>
                        <div className="conversation_content">
                            <div className="conversation-name">
                                Ludovic Courbin
                            </div>
                            <div className="conversation-text">
                                {sliceText("Lorem ipsum dolor, sit amet consectetur adipisicing elit.")}
                            </div>
                        </div>
                    </div>
                    <Link to="/messages/conversation">
                        <Icon name="send" size="big" className="conversation-sendicon"/>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Conversations;