import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../../containers/Layout'
import './message.scss';
import { Form, Input, Image, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { data } from './data';

const Message = ({ socketEmitMessage }) => {

    let datas = data;

    const messageListRef = useRef(null);

    const [inputValue, setInputValue] = useState("");
    const [dataMessages, setDataMessages] = useState(data);

    useEffect(() => {
        const scrollY = messageListRef.current.scrollHeight;
        messageListRef.current.scrollTo(0, scrollY);
    }, [dataMessages]);

    const handleChange = (e) => {
        setInputValue(e.target.value)
    };

    const handleSubmit = () => {

        setDataMessages([
            ...dataMessages,
            {
                id: datas.length + 1,
                avatarUrl: "https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598564994629",
                text: inputValue,
                date: "a few second ago",
                currentUser: true,
            }
        ])

        socketEmitMessage({
            text: inputValue,
            recipient_id: 1,
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
                    { dataMessages  && dataMessages.map(message => (
                        <div className={`message_container${message.currentUser ? '--right' : ''}`} key={message.id}>
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