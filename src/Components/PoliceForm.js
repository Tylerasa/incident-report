import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';


function PoliceForm(){
  const name = localStorage.getItem('user')
  const email = localStorage.getItem('email')
  const [status, setStatus] = useState(0)
  const [actType, setactType] = useState('')
  const [desc, setDesc] = useState('')
  let subCount = localStorage.getItem('subCount')
  
  const submit= e=>{
    e.preventDefault();
    const newReport = {
      name,
      email,
      actType,
      desc,
      department: 'Police'
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
      localStorage.setItem('subCount', subCount + 1)
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
       
    <FormGroup>
      <Label>What's Happening</Label>
        <select onChange={e=> setactType(e.target.value)}  class="form-control" o>
            <option value=''>-- What's Happening --</option>
            <option value='Burglary'>Burglary</option>
            <option value='Childhood abuse'>Childhood abuse</option>
            <option value='Domestic abuse'>Domestic abuse</option>
            <option value='Fraud'>Fraud</option>
            <option value='Murder or manslaughter'>Murder or manslaughter</option>
            <option value='Violent crime'>Violent crime</option>
            <option value='Terrorism'>Terrorism</option>
            <option value='Stalking and harassment'>Stalking and harassment</option>
            <option value='Sexual harassment'>Sexual harassment</option>
            <option value='Robbery'>Robbery</option>
            <option value='Revenge porn'>Revenge porn</option>




        </select>
    </FormGroup>
    <FormGroup>
      <Label>Can You Give A Further Decription</Label>
      <textarea class="form-control" onInput={e => setDesc(e.target.value)} placeholder="Descibe Here...">

      </textarea>
    </FormGroup>
    
    <br/>
    <Button style={{width:'100%'}}>Submit</Button>
  </Form>
)
}


export default PoliceForm