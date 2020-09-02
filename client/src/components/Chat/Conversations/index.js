import React from 'react';
import Layout from '../../../containers/Layout';
import './conversations.scss';
import { Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Conversations = () => {

    const sliceText = (text) => {
        return text.slice(0, 44) + "...";
    };

    return (
        <Layout>
            <div className="conversations">
                <div className="conversation">
                    <div className="conversation_container">
                        <Image  className="conversation-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598564994629"/>
                        <div className="conversation_content">
                            <div className="conversation-name">
                                Gautier Colasse
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