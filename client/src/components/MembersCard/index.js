import React from "react";
import { Image, Flag } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./memberCard.scss";

const MemberCard = ({ user }) => (
  <Link to={`user/${user.slug}`}>
    <div className="member-card">
      <div className="member-card_left">
        <Image
          floated="left"
          size="mini"
          className="avatar"
          avatar
          src={
            user.avatarUrl == null
              ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
              : `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
          }
        />
        <div>
          <h3 className="fullname">
            {user.firstname} {user.lastname}
          </h3>
          <p className="records">{user.records ? user.records.length : 0} iRecords</p>
        </div>
      </div>

      <div className="member-card_right">
        {user.taughtLanguages &&
          user.taughtLanguages.map((language, index) => {
              return index < 3 && 
              <Image
              key={language.id}
              src={`https://www.countryflags.io/${language.code}/flat/32.png`}
              className="record_flag_image"
              />
          })}
      </div>
    </div>
  </Link>
);

export default MemberCard;