import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AppCollapse = ({title, act, desc, department, date}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button style={{backgroundColor: 'transparent', color:'black', width: '100%', border: '2px black', textAlign:'left', }} onClick={toggle} >{act}<FontAwesomeIcon icon={faPlus}
         style={{
          float:'right'
        }}
      
      /></Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
              <p> <span  className='text-muted'>Description of Report:</span><br/> <span className='var-text'>{desc}</span></p>
              <p> <span  className='text-muted'>Department Reported To:</span><br/><span className='var-text'>{department}</span></p>
              <p><span  className='text-muted'>Date Of Report:</span><br/><span className='var-text'>{date.slice(0,28)}</span></p>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default AppCollapse;