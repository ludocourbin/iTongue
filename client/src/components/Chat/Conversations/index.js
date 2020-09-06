import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/* Containers */
import Layout from '../../../containers/Layout';

/* Components */
import { Image, Icon, Label, Placeholder } from 'semantic-ui-react';

/* Styles */
import './conversations.scss';

const Conversations = (props) => {

    const {
        socketSetRecipient,
        fetchAllThreads,
        allThreads,
        emptyAllThreads,
        currentUser,
        allThreadsLoading,
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
        if (text.length > maxLength) {
            preview += "...";
        }
        return preview;
    };

    const getContent = text => {
        try {
            const content = JSON.parse(text);
            if (content.type !== "gif") throw (new Error("Not a gif"));
            return "sent a GIF";
        } catch (err) {
            return text;
        }
    };

    const getSubject = (sender) => {
        if (currentUser.id === sender.id)
            return "You : ";
    };

    const avatarRef = useRef(null);
    const [ avatarIsLoaded, setAvatarIsLoaded ] = useState(false);

    const handdleLoadingChange = () => {
        setAvatarIsLoaded(true);
        console.log("avatarIsLoaded", avatarIsLoaded);
        console.log("avatarRef", avatarRef);
      };

    return (
        <Layout titlePage='Messages'>
            <div className="conversations">
                   {allThreads && allThreads.map(({ contact, messages, latest }) => (
                        allThreadsLoading && !avatarIsLoaded ? 
                        <div className="conversation" key={contact.id}>
                            <Placeholder fluid style={{width: "100%"}}>
                                <Placeholder.Header image>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                </Placeholder.Header>
                            </Placeholder>
                        </div>
                        :
                        <div
                            className={`conversation ${messages.some(message => !message.read && contact.id == message.sender.id) && "active"
                                }`}
                            key={contact.id}
                        >
                            <div className="conversation_container">
                                <div className="conversation_avatar__container" ref={avatarRef}>
                                    <Link to={`user/${contact.slug}`}>
                                        <Image className="conversation-avatar"
                                            src={
                                                !contact.avatarUrl
                                                    ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                                                    : process.env.REACT_APP_FILES_URL + "/" + contact.avatarUrl
                                            }
                                            onLoad={handdleLoadingChange}
                                            onError={handdleLoadingChange}
                                        />
                                        {messages.some(message => !message.read && contact.id == message.sender.id) &&
                                            <Label circular empty className="conversation-unread" />
                                        }
                                    </Link>
                                </div>
                                <div className="conversation_content">
                                    <div className="conversation-name">
                                        {contact.firstname} {contact.lastname}
                                    </div>
                                    <div className="conversation-text">
                                        <span className="bold">{getSubject(messages[messages.length - 1].sender)}</span>
                                        {sliceText(getContent(messages[messages.length - 1].text))}
                                    </div>
                                    <div className="conversation-date">
                                        {moment(latest).fromNow()}
                                    </div>
                                </div>
                            </div>
                            <Link to={`/messages/${contact.slug}/${contact.id}`} onClick={() => socketSetRecipient(contact)}>
                                <Icon name="send" size="big" className="conversation-sendicon" />
                            </Link>
                        </div>
                    ))}
            </div>
        </Layout>
    );
};

export default Conversations;