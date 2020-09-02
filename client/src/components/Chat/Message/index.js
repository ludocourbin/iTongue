import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../../containers/Layout'
import './message.scss';
import { Form, Input, Image, Header, Icon } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

const Message = (props) => {

    const { 
        socketEmitMessage, 
        socketEmitTyping, 
        currentUser, 
        socketSetRecipientId,
        socketRecipientId,
        fetchAllMessages,
        allMessages,
        setMessageInAllMessages,
    } = props;

    const params = useParams();
    const messageListRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const scrollY = messageListRef.current.scrollHeight;
        messageListRef.current.scrollTo(0, scrollY);
    }, [allMessages]);

    useEffect(() => {
        socketSetRecipientId(params.id);
    }, [socketSetRecipientId]);

    useEffect(() => {
        fetchAllMessages();
    }, [fetchAllMessages]);

    const handleChange = (e) => {
        setInputValue(e.target.value)
        socketEmitTyping({
            authorName: currentUser.firstname,
            recipientId: socketRecipientId,
        });
    };

    const handleSubmit = () => {

        setMessageInAllMessages({
            id: Date.now(),
            createdAt: new Date(),
            text: inputValue,
            sender: {
                id: currentUser.id,
                avatarUrl: currentUser.avatarUrl,
            },
        })

        socketEmitMessage({
            text: inputValue,
            authorName: currentUser.firstname,
            authorAvatarUrl: currentUser.avatarUrl,
            recipientId: socketRecipientId,
        });

        setInputValue("");
    };

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
                <div className="message-list" ref={messageListRef}>
                    {allMessages && allMessages.map(message => (
                        // 
                        <div className={`message_container${message.sender.id === currentUser.id ? '--right' : ''}`} key={message.id}>
                            <div className={`message__user${message.sender.id === currentUser.id ? '--right' : ''}`}>
                                <Image  className="message-avatar" src={`${process.env.REACT_APP_FILES_URL}/${message.sender.avatarUrl}`}/>
                            </div>
                            <div className={`message_wrapper${message.sender.id === currentUser.id ? '--right' : ''}`}>
                                <div className="message-text" className={`message-text${message.sender.id === currentUser.id ? '--right' : ''}`}>
                                    {message.text}
                                </div>
                                <div className="message-date" className={`message-date${message.sender.id === currentUser.id ? '--right' : ''}`}>
                                    {moment(message.createdAt).fromNow()}
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
                 <Form onSubmit={handleSubmit}>
                    <Input
                    icon={<Icon name='send' link onClick={handleSubmit} />}
                    fluid 
                    className="send-message" 
                    placeholder="Type your message here"
                    onChange={handleChange}
                    value={inputValue}
                    />
                 </Form>
            </div>
        </Layout>
    );
};

export default Message;