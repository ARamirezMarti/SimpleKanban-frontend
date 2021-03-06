import {  useState,useEffect } from 'react';


import './App.css';
import ColumnComponent from "./layout/columnComponent/ColumnComponent";
import EditableComponent from "./layout/editableComponent/editableComponent";
import HeaderComponent from "./layout/headerComponent/headerComponent";
import taskRequest from '../src/api/taskRequest';



function App() {
  const [showEditable,SetEditable]=useState(false);
  // Gets the name//quantity of  columns to create
  const [columnTitle,setColumnTitle]=useState([]);

  const editableDisplayed= {display:'none'};
  const editableNotDisplayed= {display:'block'};
  const [requestedData,setRequestedData]= useState([]);


  const getdata = async ()=>{
    const data = await taskRequest.getalldata();
      setRequestedData(data.tasks)
  }

  useEffect(() =>{
    getdata();
 
 },[]);

  return (    
    <div>
      <HeaderComponent />
      <div className="editable" style={showEditable ? editableDisplayed:editableNotDisplayed}>
        <EditableComponent 
        setColumnTitle={setColumnTitle} 
        columnTitle={columnTitle} 
        />
      </div>

      <div id="divButton">
        <button id="displayButton" onClick={()=>{if(showEditable===false){SetEditable(true)}else{SetEditable(false)}}}> Create Column</button>
      </div>

     <div className="group">

     { columnTitle.map((item ,index)=>{
       const columnData={item:item,index:Math.max(index)}
       return(
         <ColumnComponent  
         key={index}
         title={item }
         data={columnData} 
         id={index}
         columns={columnTitle} 
         size={showEditable}
         getdata={getdata}
         requestedData={requestedData}
         setRequestedData={setRequestedData}
         >

         </ColumnComponent>
       )
     })}

     </div>
    </div>
  );
}

export default App;
