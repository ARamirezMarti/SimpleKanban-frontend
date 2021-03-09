/* eslint-disable react-hooks/exhaustive-deps */
import './columnStyle.css';
import Draggable from 'react-draggable';
import { BlockPicker } from 'react-color';
import rightarrow from '../../assets/rightArrow.png'
import leftarrow from '../../assets/leftArrow.png'
import cross from '../../assets/delete.png'
import taskRequest from '../../api/taskRequest';

import React, { useState, useEffect } from 'react';
import task from "../../models/task";


function ColumnComponent(props) {
    const [showTaskForm,setTaskForm] =useState(false);
    const [color,setColor] =useState('0000');
    const [size,setSize]=useState({minWidth:'24%',marginLeft:'1%'});
    const [message,setMessage]= useState('');

    const handlesubmit =  async (event )=>{
      event.preventDefault();

      var new_task =new task(
        Math.max(props.data.index), 
        event.target.title.value,
        event.target.description.value,
        event.target.person.value,
        color,
        props.title
        );

     let response= await taskRequest.addtask(new_task);
      if(response.ok){
       props.getdata();
      }
      document.getElementById('tf').reset();
    }

    async function deleteTask(indice){      
      const response = await taskRequest.deletetask(indice);
      if(response.ok){
        await props.getdata();
      }    
    }      

    async function moveTask(task){ 

        const {item_id,index,mode}= task;   
        const response = await taskRequest.updateTask(mode,index,item_id,props.columns);
        if(response.ok){
          await props.getdata();
        }else{
          setMessage("Can not move the task on that direction")
        }

      }
   
    useEffect(async ()=>{   
      const interval = setInterval(() => {
        setMessage('');
      }, 5000);    
      if(props.size){
        setSize({minWidth:'28%',marginLeft:'3%'});
      }else{
         setSize({minWidth:'24%',marginLeft:'1%'});
      }
    },[props.size]);


  return (
    <div >
      <div className="columnframe" style={size}>
      
      <p className="span_alert">{message}</p>

        <div className="columnHeader">
       
            <h1 >{props.title}</h1>

            
            <button onClick={()=>{ setTaskForm(!showTaskForm)}} value="+"> +</button>
          

        </div>
        <Draggable>
            <div  
            style={showTaskForm ? {display:'block',marginLeft:'20%' }:{display:'none'}}
          
            >
              <form className="taskform" id="tf" onSubmit={handlesubmit}>
                    <h3>Task for: <b>{props.title}</b><br></br></h3>
                
                    <label><b>Title</b></label><br></br>
                    <input id="title" autoFocus ></input>
                    <label><b>Description</b></label>

                    <textarea rows="6" id="description"  ></textarea>
                    <label><b>Person</b></label>

                    <input id="person"   ></input><br></br>
                    <label><b>Color</b></label>
                    
                    <BlockPicker height="150px" id="picker"  width="150px" color={color} onChangeComplete={e=>{setColor(e.hex)}} triangle="hide"></BlockPicker>
                    <br></br>

                    <button type="submit"  ><b>Create task</b></button>
                    
              </form>
            </div>
        </Draggable>
      
      {
        props.requestedData.map((item,index)=>{
          //props.id === parseInt( item.column_id) && 
          if(item.column_title == props.title ){
          return(
            
              <div className="task" 
                key={item._id} 
                id={item.column_id} 
                style={{ backgroundColor:item.color}} 
                draggable="true" 
        
            
              >

              

              <button onClick={()=>{deleteTask(item._id)}} > <img width='10' height='10' src={cross}></img></button>

              <button onClick={()=>{moveTask({item_id:item._id,index:item.column_id,mode:'forward'})}} id="changeButton" ><img  src={rightarrow}></img></button>
              <button onClick={()=>{moveTask({item_id:item._id,index:item.column_id,mode:'backward'})}} id="changeButton" ><img src={leftarrow}></img></button>
              <div className="taskFrame" >
                  <h3>{item.title}</h3>
                  
                  <h4>{item.person} </h4>
                  <p>{item.description}</p>
              </div>
            </div>  
          
          )


        }

        })
      }
      </div>
   </div>
  )
}

export default ColumnComponent;
