import React from 'react';
import Layout from '../../../containers/Layout'
import './message.scss';
import { Input, Image, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Message = () => {

    return (
        <Layout>
            <Header size="tiny" className="edit-profil_back">
                <Link to='/messages'>
                    <Icon name="chevron circle left" size="small" />
                    Retour aux messages
                </Link>
            </Header>
            <div className="message">

                <div className="message-list">
                    <div className="message_container">
                        <div className="message__user">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598564994629"/>
                            <div className="message-name">Gautier</div>
                        </div>
                    </div>
                </div>
                <Input icon="send" fluid className="send-message"/>
            </div>
        </Layout>
    );
};

export default Message;