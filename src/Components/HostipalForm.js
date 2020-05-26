import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import AppAlert from './AppAlert'
import { useState } from 'react';
import axios from 'axios';


function HostipalForm(){
  const email = localStorage.getItem('email')
  const name = localStorage.getItem('user')
  const [status, setStatus] = useState(0)
  const [actType, setactType] = useState('')
  const [desc, setDesc] = useState('')
  
  const submit= e=>{
    e.preventDefault();
    const newReport = {
      name,
      email,
      actType,
      desc,
      department: 'Health'
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(newReport)
    axios.post('http://localhost:5000/api/report', newReport, config)
    .then((res)=>{
      console.log(res.status)
      if(res.status === 200){
      setStatus(res.status)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Form onSubmit={submit}>
        {
          status === 200?
          <Redirect to ={
            { 
              pathname: '/user',
              state: {
                user: name
              }
            }
          } />:
          ''
        }
        {
          (actType === 'Bleeding')?
          <AppAlert color='info' text='How Deep Is The Cut, Try And Stop The Bleeding If You Can.'/>:
          (actType === 'Breathing difficulties')?
          <AppAlert color='info' text='Try Calming The Person Down. Most Breathing difficulties are caused by Panic Attacks.'/>:
          (actType === 'Someone collapses')?
          <AppAlert color='danger' text='Check The Pulse'/>:
          (actType === 'Fit and/or epileptic seizure')?
          <AppAlert color='danger' text='Do Not Move The Person or Try And Stop Them Shaking If They Are Having A Fit Or Seizure, Unless They Are At Risk Of Danger'/>:
          (actType === 'Bleeding')?
          <AppAlert color='Servere Pain' text='Try Calming The Person Down.'/>:
          (actType === 'Heart Attack')?
          <AppAlert color='danger' text='Try Calming The Person Down.'/>:
          (actType === 'Stroke')?
          <AppAlert color='danger' text='Get The Person To The Hostipal ASAP.'/>:
          ''
        }
       
    <FormGroup>
      <Label>What's Happening</Label>
        <select  onChange={e=> setactType(e.target.value)}  class="form-control">
            <option value=''>--What's Happening--</option>
            <option value='Bleeding'>Bleeding</option>
            <option value='Breathing difficulties'>Breathing difficulties</option>
            <option value='Someone collapses'>Someone collapses</option>
            <option value='Fit and/or epileptic seizure'>Fit and/or epileptic seizure</option>
            <option value='Servere Pain'>Severe pain</option>
            <option value='Heart Attack'>Heart attack</option>
            <option value='Stroke'>Stroke</option>
           



        </select>
    </FormGroup>
    <FormGroup>
      <Label>Can You Give A Further Decription</Label>
      <textarea class="form-control" onInput={e => setDesc(e.target.value)} placeholder="Describe Here...">

      </textarea>
    </FormGroup>
    
    <br/>
    <Button style={{width:'100%'}}>Submit</Button>
  </Form>
)
}


export default HostipalForm