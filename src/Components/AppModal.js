/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from "react";
import Form from "./Form";
import SignUpForm from "./SignUpForm";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AppModal = props => {
  const { buttonLabel, className, title } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        style={{
          backgroundColor: "transparent",
          color: "black",
          width: "100%",
          border: "none",
          textAlign: "left"
        }}
        onClick={toggle}
      >
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {title === "Sign Up" ? <SignUpForm /> : <Form />}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AppModal;
