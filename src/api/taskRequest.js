const url = 'http://localhost:5555';

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

        

    
}

export default taskRequest;