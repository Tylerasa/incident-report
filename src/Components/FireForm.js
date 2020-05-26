import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import AppAlert from './AppAlert'
import { useState } from 'react';
import axios from 'axios';


function FireForm(){
  const [danger, setDanger] = useState('');
  const name = localStorage.getItem('user')
  const email = localStorage.getItem('email')
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
      department: 'Fire'
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
           (danger === 'yes')?
           <AppAlert color='danger' text='Please Keep Away From The Fire'/>
            :
            (danger === 'no')?
            <AppAlert color='success' text='Good Maintain Your Distnce'/>
            :
            ''

       }
       {
         (actType === 'Class A')?
         <AppAlert color='danger' text='Class A Fires Can Be Killed With Water Or Fire Extinguisher'/>:
         (actType === 'Class B')?
         <AppAlert color='danger' text='Class B Fires Can Be Killed With Foam, Powder Or A Carbon Dioxide Fire Extinguisher'/>:
         (actType === 'Class C')?
         <AppAlert color='danger' text='Class C Fires Can Be Killed With Carbon Dioxide Or A Dry Powder Fire Extinguisher  || Do Not Add Water'/>:
         (actType === 'Class D')?
         <AppAlert color='danger' text='Class D Fires Can Be Killed With A Dry Powder Fire Extinguisher'/>:
         (actType === 'Class K')?
         <AppAlert color='danger' text='Class K Fires Can Be Killed With A Wet Chemical Fire Extinguisher'/>:
         ''
       }

    <FormGroup>
      <Label>Are You Anywhere Near The Fire?</Label>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="danger" value='yes' onClick={e=> {setDanger(e.target.value); console.log(e.target.value)}} is />{' '}
          Yes
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="danger" value='no' onClick={e=> {setDanger(e.target.value); console.log(e.target.value)}} />{' '}
         No
        </Label>
      </FormGroup>
    </FormGroup>
    <FormGroup>
    <Label>What's Happening</Label>
        <select onChange={e=> setactType(e.target.value)}  class="form-control" o>
            <option value=''>-- What's Happening --</option>
            <option value='Class A'>Class A -- Wood || Paper || Cloth || Trash || Plastic</option>
            <option value='Class B'>Class B -- Gasoline|| Oil || Alcohol ||Flammables</option>
            <option value='Class C'>Class C -- Electricity</option>
            <option value='Class D'>Class D -- Metal Ignition</option>
            <option value='Class K'>Class K -- Cooking Oil || Kitchen</option>
        </select>
    </FormGroup>
    <FormGroup>
      <Label>Can You Give A Further Decription</Label>
      <textarea class="form-control" onInput={e=> setDesc(e.target.value)} placeholder="Descibe Here...">

      </textarea>
    </FormGroup>
    
    <br/>
    <Button style={{width:'100%'}}>Submit</Button>
  </Form>
)
}


export default FireForm