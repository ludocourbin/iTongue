import React, { useEffect } from 'react';
import Layout from '../../../containers/Layout';
import './conversations.scss';
import { Image, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Conversations = (props) => {

    const { 
        socketSetRecipient,         
        fetchAllThreads,
        allThreads,
        emptyAllThreads
    } = props;

    useEffect(() => {
        fetchAllThreads();
        return () => {
            emptyAllThreads();
        }
    }, [fetchAllThreads])

    const sliceText = (text) => {
        const maxLength = 24;
        let preview = text.slice(0, maxLength);
        if(text.length > maxLength){
            preview += "...";  
        }
        return  preview;
    };

    return (
        <Layout titlePage='Messages'>
            <div className="conversations">

                { allThreads && allThreads.map(({contact, messages, latest}) => (
                    <div 
                    className={`conversation ${messages.some(message => !message.read && contact.id == message.sender.id) && "active"
                    }`}
                    key={contact.id}
                    >
                        <div className="conversation_container">
                            <div className="conversation_avatar__container">
                                <Link  to={`user/${contact.slug}`}>
                                    <Image className="conversation-avatar"
                                    src={
                                        !contact.avatarUrl
                                        ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                                        : process.env.REACT_APP_FILES_URL + "/" + contact.avatarUrl
                                    }
                                    />
                                    { messages.some(message => !message.read && contact.id == message.sender.id) &&
                                        <Label circular empty className="conversation-unread"/>
                                    }
                                </Link>

                            </div>
                            <div className="conversation_content">
                                <div className="conversation-name">
                                    {contact.firstname} {contact.lastname}
                                </div>
                                <div className="conversation-text">
                                    {sliceText(messages[messages.length - 1].text)}
                                    {/* Mettre You : / Me : */}
                                </div>
                                <div className="conversation-date">
                                    {moment(latest).fromNow()}
                                </div>
                            </div>
                        </div>
                        <Link to={`/messages/${contact.slug}/${contact.id}`} onClick={() => socketSetRecipient(contact)}>
                            <Icon name="send" size="big" className="conversation-sendicon"/>
                        </Link>
                    </div>
                ))}

            </div>
        </Layout>
    );
};

export default Conversations;