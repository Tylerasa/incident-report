import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"




function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      email,
      password,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(newUser)
    axios.post('http://localhost:5000/api/auth', newUser, config)
    .then((res)=>{
      console.log(res.data.user.name)
      if(res.status === 200){
      setStatus({number:res.status, name: res.data.user.name, email: res.data.user.email})
      localStorage.setItem('logged',1)
      console.log(res.status)
      
      }
    })
    .catch((err)=>{
      console.log(err)
    })
   
  }
  return(
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
      <Label>Email</Label>
      <Input type="email" name="email" onInput={e => setEmail(e.target.value)}  placeholder="Email..." />
    </FormGroup>
    <FormGroup>
      <Label>Password</Label>
      <Input type="password" name="password" onInput={e => setPassword(e.target.value)}  placeholder="Password..." />
    </FormGroup>
    <br/>
    <Button style={{width:'100%'}}>Submit</Button>
  </Form>
  )
}


export default LoginForm