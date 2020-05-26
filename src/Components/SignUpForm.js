import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


function SignUpForm(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState({
    number: 0,
    name: localStorage.getItem('user') || '',
    email: localStorage.getItem('email') || ''
  });
  useEffect(()=>{
    localStorage.setItem('user', status.name)
    localStorage.setItem('email', status.email) 

  }, [status.name, status.email])
 

  const submit= e=>{
    e.preventDefault();
    const newUser = {
      name,
      email,
      phone,
      password,
      gender
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(newUser)
    axios.post('http://localhost:5000/api/users', newUser, config)
    .then((res)=>{
      console.log(res.data.user.name)
      if(res.status === 200){
        setStatus({number:res.status, name: res.data.user.name, email: res.data.user.email})
      
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Form onSubmit={submit}>
        {
          status.number === 200?
          <Redirect to ={
            { 
              pathname: '/user',
              state: {
                user: status.name
              }
            }
          } />:
          ''
        }
       <FormGroup>
      <Label>Full Name</Label>
      <Input type="text" name="fullName"  onInput={e => setName(e.target.value)} placeholder="Full Name..." />
    </FormGroup>
    <FormGroup>
      <Label>Email</Label>
      <Input type="email" name="email"  onInput={e => setEmail(e.target.value)} placeholder="Email..." />
    </FormGroup>
    <FormGroup>
      <Label>Phone Number</Label>
      <Input type="tele" name="phone"  onInput={e => setPhone(e.target.value)} placeholder="Phone Number..." />
    </FormGroup>
    <FormGroup>
      <Label for="examplePassword">Password</Label>
      <Input type="password" name="password"  onInput={e => setPassword(e.target.value)} id="examplePassword" placeholder="Password..." />
    </FormGroup>
   
   
   
   
    <FormGroup tag="fieldset">
      <legend>Gender</legend>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="gender" value='male' onClick={e=> setGender(e.target.value)}  />{' '}
          Male
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="gender" value='female' onClick={e=> setGender(e.target.value)} />{' '}
         Female
        </Label>
      </FormGroup>
    
    </FormGroup>
    <br/>
    <Button style={{width:'100%'}}>Submit</Button>
  </Form>
)
}


export default SignUpForm