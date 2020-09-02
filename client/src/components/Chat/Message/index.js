import React, { useState } from 'react';
import Layout from '../../../containers/Layout'
import './message.scss';
import { Input, Image, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { data } from './data';

const Message = () => {

    return (
        <Layout>
            <Header size="tiny" className="message_back">
                <Link to='/messages' className="message_link__back">
                    <Icon name="chevron circle left" size="small" />
                    Retour aux messages
                </Link>
                <Link to={`/user/$`} className="message_link__user">
                    <div>Ludovic</div>
                    <Image  className="message_avatar__user" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1599001023114"/>
                    
                </Link>
            </Header>
            <div className="message">
                <div className="message-list">
                    { data  && data.map(message => (
                        <div className={`message_container${message.currentUser ? '--right' : ''}`}>
                            <div className={`message__user${message.currentUser ? '--right' : ''}`}>
                                <Image  className="message-avatar" src={message.avatarUrl}/>
                            </div>
                            <div className={`message_wrapper${message.currentUser ? '--right' : ''}`}>
                                <div className="message-text" className={`message-text${message.currentUser ? '--right' : ''}`}>
                                    {message.text}
                                </div>
                                <div className="message-date" className={`message-date${message.currentUser ? '--right' : ''}`}>
                                    {message.date}
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
                <Input icon="send" fluid className="send-message" placeholder="Type your message here"/>
            </div>
        </Layout>
    );
};

export default Message;