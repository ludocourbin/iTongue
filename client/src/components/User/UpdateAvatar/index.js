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
                src={ avatarUrl && avatarUrl.slice(0, 4) == "null" ?
                    "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg" 
                    :
                    `${process.env.REACT_APP_FILES_URL}/${avatarUrl}`
                }
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

