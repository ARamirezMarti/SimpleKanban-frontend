import './editableStyle.css';
import {  useEffect, useState } from 'react';

function EditableComponent(props) {
  const [maxMessage,SetMaxMessage]=useState();
  const [selectList,SetSelectList]=useState([]);


  const handlesubmit =(event )=>{
  event.preventDefault();
  // Settitle gets title and change it in app.js
  // Limit to 3 columns 
  if(props.columnTitle.length<3){
    props.setColumnTitle([...props.columnTitle,event.target.titulo.value]);
    SetSelectList([...selectList,event.target.titulo.value])
  }else{
    SetMaxMessage('Max 3 columns');
  }  
  document.getElementById('createForm').reset();
 }
 

  const handleDelete=(event)=>{
    // Esto si que borra del array el item     

    var indice = selectList.indexOf(event.target.value);
    props.columnTitle.splice(indice,1);
    selectList.splice(indice,1);
    props.setColumnTitle([...props.columnTitle]);
    SetSelectList([...selectList])

    
     
  }
 
 return (
    <div> 
      <div className="editableFrame"  >
        
        <div className="formframe">
        
          <h3>Create column</h3>
          <hr></hr>      
          <form onSubmit={handlesubmit} id="createForm">
                        
              <input type="text" placeholder="Column title" htmlFor="titulo" name="titulo" required ></input>              
              <button type="submit" value="Create" >Create</button>    

          </form>
          <span style={{color:'red'}}><b>{maxMessage}</b></span>
        </div>  

        <div className="formframe ">
         
          <h3>Edit Column</h3>
          <hr></hr>
          
          <button>hola</button>
          <button>hola</button>

          <button>hola</button>
        </div>

        <div className="formframe " id="deleteform">

          <h3>Delete Column</h3>
          <hr></hr>
          <select onChange={handleDelete} placeholder="Tables"> Elige tabla

              {selectList.map((item,index)=>{
                 return( 

                   <option value={item} key={index}>{item}</option>)
              })}

            
          </select>
        </div>         
        </div>
    </div>
  );
}

export default EditableComponent;
