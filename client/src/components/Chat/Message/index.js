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
        userTyping,
    } = props;

    const params = useParams();
    const messageListRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const scrollY = messageListRef.current.scrollHeight;
        messageListRef.current.scrollTo(0, scrollY);
    }, [allMessages]);

    useEffect(() => {
        socketSetRecipientId({id: params.id});
    }, [socketSetRecipientId]);

    useEffect(() => {
        fetchAllMessages();
    }, [fetchAllMessages]);

    let typing = null;
    const handleChange = (e) => {
        setInputValue(e.target.value)
        if (typing) {
            clearTimeout(typing);
        }
        typing = setTimeout(() => { 
            socketEmitTyping({
                authorName: currentUser.firstname,
                recipientId: socketRecipientId.id,
            });
            typing = null;
        }, 200);
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
        });

        socketEmitMessage({
            text: inputValue,
            authorName: currentUser.firstname,
            authorAvatarUrl: currentUser.avatarUrl,
            recipientId: socketRecipientId.id,
        });

        setInputValue("");
    };

    let contact;
    if (allMessages && allMessages[0]) {
        contact = allMessages[0].sender.id == currentUser.id ? allMessages[0].recipient : allMessages[0].sender;
    }

    return (
        <Layout>
            <Header size="tiny" className="message_back">
                <Link to='/messages' className="message_link__back">
                    <Icon name="chevron circle left" size="small" />
                    Retour aux messages
                </Link>
                { contact &&  
                    <Link to={`/user/${contact.slug}`} className="message_link__user">
                        <div>
                            {contact.firstname}
                        </div>
                    
                        <Image  className="message_avatar__user" 
                        src={process.env.REACT_APP_FILES_URL +"/" + contact.avatarUrl}
                        />
                    </Link>
                }
            </Header>
            <div className="message">
                <div className="message-list" ref={messageListRef}>
                    {allMessages && allMessages.length && allMessages.map(message => (
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
                 <div className="message-typing">
                        
                        {userTyping.typing ? userTyping.authorName + " est en train d'écrire.." : ""}
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