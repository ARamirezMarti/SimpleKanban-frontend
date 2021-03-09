const  url = 'http://localhost:5555';

class taskRequest  {
   
    static async  addtask(data){

        let response = await fetch(`${url}/api/addtask`,{
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{
                'Content-Type': 'application/json'
                }
            })
        let json= response.json();
        return json; 
        
    }

    static async getalldata(){

        let response = await fetch(`${url}/api/getall`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
                }     
        });
        let json = await response.json();
        return json;
    }

    static async deletetask(id){

        let response = await fetch(`${url}/api/deletetask/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
                }     
        });
        return response.json();

    }

    static async updateTask(mode,column_id,id,arraycolumns){

        var response;
        if(mode === 'forward'){
            column_id=parseInt(column_id)+1;
        }
        if(mode === 'backward'){
            column_id=parseInt(column_id)-1;
        }
        var column_title =arraycolumns[column_id];
        if(column_id>=0 && column_id<3){
            response = await fetch(`${url}/api/updatetask/${id}`,{
                method:'PUT',
                body: JSON.stringify({column_id:column_id,column_title:column_title}),
                headers:{
                    'Content-Type': 'application/json'
                    } 
            })
            return response.json();
        }
        response={ok:false}
        
        return response;

    }

        

    
}

export default taskRequest;