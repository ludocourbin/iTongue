import React, { useEffect } from 'react';
import Layout from '../../../containers/Layout';
import './conversations.scss';
import { Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Conversations = (props) => {

    const { 
        socketSetRecipientId,         
        fetchAllThreads,
        allThreads,
    } = props;

    useEffect(() => {
        fetchAllThreads();
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

                { allThreads && allThreads.map(({contact, messages}) => (
                    <div className="conversation" key={contact.id}>
                        <div className="conversation_container">
                            <Image  className="conversation-avatar" src={`${process.env.REACT_APP_FILES_URL}/${contact.avatarUrl}`}/>
                            <div className="conversation_content">
                                <div className="conversation-name">
                                    {contact.firstname} {contact.lastname}
                                </div>
                                <div className="conversation-text">
                                    {sliceText(messages[messages.length - 1].text)}
                                    {/* Mettre You : / Me : */}
                                </div>
                            </div>
                        </div>
                        <Link to={`/messages/${contact.slug}/${contact.id}`} onClick={() => socketSetRecipientId(contact.id)}>
                            <Icon name="send" size="big" className="conversation-sendicon"/>
                        </Link>
                    </div>
                ))}

            </div>
        </Layout>
    );
};

export default Conversations;