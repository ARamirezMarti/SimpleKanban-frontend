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

/* TODO:
Crear en el modelo column_title tanto front como back y que ademas de distribuir por el column id, distribuya por nombre de la columna cada tarea
Al hacer esto el cambiar el column_id para mover de columna tendra que cambiar ya que no solo dependera del column_id */

function ColumnComponent(props) {
    const [showTaskForm,setTaskForm] =useState(false);
    const [color,setColor] =useState('0000');
    const [size,setSize]=useState({minWidth:'24%',marginLeft:'1%'});
    const [requestedData,setRequestedData]= useState([]);
    const [message,setMessage]= useState('');

    

    const handlesubmit =  async (event )=>{
      event.preventDefault();

      var new_task =new task(
        Math.max(props.data.index), 
        event.target.title.value,
        event.target.description.value,
        event.target.person.value,
        color
        );

     let response= await taskRequest.addtask(new_task);
      if(response.ok){
       createTask(new_task);
      }
      document.getElementById('tf').reset();
    }
    
    const createTask = (new_task)=> {
      setRequestedData([ ...requestedData,new_task]);
    }
    const getdata = async ()=>{
      const data = await taskRequest.getalldata();
        setRequestedData(data.tasks)
    }

    async function deleteTask(indice){
      /* props.taskList.splice(indice,1);
      props.settaskList([...props.taskList]); */

      // TODO: primer delete devuelve siempre false, necesita dos clicks para borrar el primero.
     const response = await taskRequest.deletetask(indice);
       //console.log(response);
       await getdata();

    }      

    function goForward(indice){      
      if(props.taskList[indice].column_id+1>2){
        return null;
      }
      props.taskList[indice].column_id = props.taskList[indice].column_id+1;
      props.settaskList([...props.taskList])
    }
    function goBackward(indice){
      if(props.taskList[indice].column_id-1<0){
        return null;
      }     
      
      props.taskList[indice].column_id = props.taskList[indice].column_id-1;
      props.settaskList([...props.taskList])
    }

   
    useEffect(async ()=>{
       getdata();
      if(props.size){
        setSize({minWidth:'28%',marginLeft:'3%'});
      }else{
         setSize({minWidth:'24%',marginLeft:'1%'});
      }
    },[props.size]);


  return (
    <div >
      <div className="columnframe" style={size}>
     
        <div className="columnHeader">
       
            <h1 >{props.title}</h1>
            <span>{message}</span>
            
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
        requestedData.map((item,index)=>{
          

          if(props.id === parseInt( item.column_id) ){
          return(

              <div className="task" 
                key={item._id} 
                id={item.column_id} 
                style={{ backgroundColor:item.color}} 
                draggable="true" 
        
            
              >
              

              <button onClick={()=>{deleteTask(item._id)}} > <img width='10' height='10' src={cross}></img></button>

              <button onClick={()=>{goForward(index)}} id="changeButton" ><img  src={rightarrow}></img></button>
              <button onClick={()=>{goBackward(index)}} id="changeButton" ><img src={leftarrow}></img></button>
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
