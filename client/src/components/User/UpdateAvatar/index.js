import React, { useRef } from 'react';

/* Components */ 
import { Image, Icon } from 'semantic-ui-react';

import './updateavatar.scss';

const UpdateAvatar = ({ avatarUrl, isUserAccount, editProfilAvatar }) => {

    const addAvatarRef = useRef(null);

    const handdleClickAvatar = (e) => {
        addAvatarRef.current.click();
    };

    const handdleAvatarChange = (e) => {
        if(e.target.files) {
            editProfilAvatar(e.target.files[0]);
        }
    };

    return (
        <div className="container_avatar">
            <div className="container_avatar__wrapper">
                <Image 
                avatar 
                size="small"
                src={`${process.env.REACT_APP_API_URL}/${avatarUrl}` || 'https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg'}
                bordered
               
                />
                { isUserAccount && <Icon name="add" className="add_image_avatar" circular onClick={handdleClickAvatar}/> }
                <input 
                type="file" 
                ref={addAvatarRef} 
                style={{ visibility: "hidden" }}
                onChange={handdleAvatarChange}
                />
            </div>
        </div>
    );
};

export default UpdateAvatar;

