/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form from './Form'
import PoliceForm from './PoliceForm'
import HostipalForm from './HostipalForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeather } from '@fortawesome/free-solid-svg-icons'
import FireForm from './FireForm';

class AppModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <a color="danger" onClick={this.toggle}
        style={{
          width:'100%'
        }}

        >{this.props.buttonText}
        <FontAwesomeIcon icon={faFeather}
        style={{
          float:'right'
        }}
        />

        </a>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
              {
                (this.props.title === 'Crime Report'? <PoliceForm/>:
                this.props.title === 'Fire Report'? <FireForm/> :
                <HostipalForm/>
                )
              }
          </ModalBody>
        
        </Modal>
      </div>
    );
  }
}

export default AppModal;
