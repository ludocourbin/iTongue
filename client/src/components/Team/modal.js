import React, { useState, useEffect } from "react";
import { Image, Modal, Icon, Flag } from "semantic-ui-react";
import "./style.scss";
import { motion } from "framer-motion";

let pyroOn = null;

const MyModal = ({ member, visible, setModalVisible, setPyroVisible }) => {
  useEffect(() => {
    if (visible) {
      setPyroVisible(true);
      pyroOn = setTimeout(() => {
        setPyroVisible(false);
        pyroOn = null;
      }, 3000);
    }
  }, [visible]);

  const handleModalClose = () => {
    if (pyroOn) {
      setPyroVisible(false);
      clearTimeout(pyroOn);
      pyroOn = null;
    }
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        onClose={handleModalClose}
        onOpen={() => setModalVisible(true)}
        open={visible}
        className="myModal"
      >
        <motion.div
          className="myModal-topside"
          initial={{ x: "+100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          <Image
            className="myModal-topside__img"
            size="small"
            src={member.picture}
            wrapped
            circular
            centered
          />
          <h3>{member.name}</h3>
          <span>{member.spe}</span>
        </motion.div>
        <div className="myModal-botside">
          <motion.div
            className="myModal-botside__quote"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            <Icon name="quote left" size="tiny" className="myQuote" />
            <p>{member.desc}</p>
          </motion.div>
          <div className="myModal-botside__links">
            <a href={member.linkedin}>
              <Icon name="linkedin" size="big" />
            </a>
            <a href={member.github}>
              <Icon name="github" size="big" />
            </a>
            {member.portfolio && (
              <a href={member.portfolio}>
                <Icon name="linkify" size="big" />
              </a>
            )}
          </div>
          <div className="myModal-botside__location">
            <img
              className="myModal-botside__flag"
              src="https://www.countryflags.io/fr/flat/32.png"
            />
            <div>{member.location}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;