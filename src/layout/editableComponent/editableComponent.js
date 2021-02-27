import './editableStyle.css';
import {useState } from 'react';
import EditableLabel from 'react-inline-editing';


function EditableComponent(props) {
  const [maxMessage,SetMaxMessage]=useState();
  const [selectList,SetSelectList]=useState([]);
  const [getIndex,setUpdateIndex]=useState([]);
  

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
    var index = selectList.indexOf(event.target.value);
    props.columnTitle.splice(index,1);
    props.setColumnTitle([...props.columnTitle]);
    SetSelectList([...props.columnTitle]);
   /*  selectList.splice(index,1);
    SetSelectList([...selectList]) */

  }

  const getindex = (event)=>{
    console.log("evento",event);
    setUpdateIndex(props.columnTitle.indexOf(event));
    console.log(getIndex);
  }

  const handleupdate = (event)=>{
    
    props.columnTitle[getIndex]=event;
    props.setColumnTitle([...props.columnTitle]);
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
         
          <h3>Change Column name</h3>
          <hr></hr>
          <div className="updateform">
          {
            selectList.map((item,index)=>{
                 return( 
                  <EditableLabel className="editable"
                    text={item} 
                    key={index}
                    inputWidth='50px'
                    inputHeight='10px'
                    inputMaxLength='25'
                    labelFontWeight='bold'
                    inputFontWeight='bold'
                    labelClassName='editableLabel'
                    inputClassName='editableInput'
                    onFocus={getindex}
                    onFocusOut={handleupdate}
                    >



                    </EditableLabel>
                  
                   
                )
              })

            
          }
          </div>
     
        </div>

        <div className="formframe " id="deleteform">

          <h3>Delete Column</h3>
          <hr></hr>
          <div>
          <select onChange={handleDelete} >
              <option>Select a column to delete</option>
              {selectList.map((item,index)=>{
                 return( 

                   <option value={item} key={index}>{item}</option>)
              })}
          
            
          </select>
          </div>
        </div>         
        </div>
    </div>
  );
}

export default EditableComponent;
