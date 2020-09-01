import React from 'react';
import Layout from '../../../containers/Layout'
import './message.scss';
import { Input, Image, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
                    <div className="message_container">
                        <div className="message__user">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1599001023114"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper">
                            <div className="message-text">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date">a few seconds ago</div>
                        </div>
                    </div>
                    <div className="message_container">
                        <div className="message__user--right">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598564994629"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper--right">
                            <div className="message-text--right">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date--right">a few seconds ago</div>
                        </div>
                    </div>
                    <div className="message_container">
                        <div className="message__user">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1599001023114"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper">
                            <div className="message-text">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date">a few seconds ago</div>
                        </div>
                    </div>
                    <div className="message_container">
                        <div className="message__user--right">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598564994629"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper--right">
                            <div className="message-text--right">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date--right">a few seconds ago</div>
                        </div>
                    </div>
                    <div className="message_container">
                        <div className="message__user">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1599001023114"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper">
                            <div className="message-text">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date">a few seconds ago</div>
                        </div>
                    </div>
                    <div className="message_container">
                        <div className="message__user--right">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598564994629"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper--right">
                            <div className="message-text--right">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date--right">a few seconds ago</div>
                        </div>
                    </div>
                    <div className="message_container">
                        <div className="message__user">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1599001023114"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper">
                            <div className="message-text">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date">a few seconds ago</div>
                        </div>
                    </div>
                    <div className="message_container">
                        <div className="message__user--right">
                            <Image  className="message-avatar" src="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598564994629"/>
                            {/* <div className="message-name">Gautier</div> */}
                        </div>
                        <div className="message_wrapper--right">
                            <div className="message-text--right">Lorem ipsum dolor, sit amet zeas ee consectetur adipisicing elit.</div>
                            <div className="message-date--right">a few seconds ago</div>
                        </div>
                    </div>

                </div>
                <Input icon="send" fluid className="send-message" placeholder="Type your message here"/>
            </div>
        </Layout>
    );
};

export default Message;