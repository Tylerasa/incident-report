import React, { Component } from "react";
import {Container} from 'reactstrap'
import AppModal from './AppModal'
import NavBar from './NavBar'
export class Landing extends Component {
  render() {
    return (
     <div className='landing-view'>
       <NavBar/>
       
        <div className='buttons'>
        <span style={{border:'2px solid #eee', backgroundColor: '#fe525e', borderRadius: '50px'}}>
        <AppModal  buttonLabel='Sign Up' title='Sign Up'/>
        </span>
        <br/>
        <span style={{border:'2px solid #eee', backgroundColor: '#fe525e', color:'#f4f7e1', borderRadius: '50px'}}>

        <AppModal buttonLabel='Login ' title='Login '/> {'   '}
        </span>

        </div>
     </div>
    );
  }
}

export default Landing;
