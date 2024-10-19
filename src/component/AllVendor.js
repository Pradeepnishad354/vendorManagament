import { useState,useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AllVendor=()=>{


    const [vendor, setVendor] = useState([]);

    const AllVendors = async () => {
        try {
            const response = await fetch(`http://localhost:9999/vendor/get-all-vendor`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

          
            const data = await response.json();
            console.log("data",data)
            setVendor(data);
        } catch (error) {
            console.log(error);
        }
    };

   
    const DeleteVendor=async(id)=>{

        try{
    
            const response=  await fetch(`http://localhost:9999/vendor/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
    
            
        }})
    
    
    
            const data=  await response.text()
            toast.success("Vendor delete successfully")
            console.log(data)
            
            AllVendors();
          
    
    
        }catch(error){
            console.log(error);
            
        }
    
    
    }
    

    useEffect(()=>{
        AllVendors()
    },[])

    return (
        <>
             <div className="container mt-5">
       <div className="mt-2"><Button variant="warning"><Link to={`/vendor`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus-fill" viewBox="0 0 16 16">
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0"/>
</svg>Add Vendor</Link></Button> </div>
            <Table striped bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Category</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendor.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.category}</td>
                                <td>{item.address}</td>
                             
<div>
<Button variant="primary" style={{ marginRight:'10px' }}>
  <Link to={`/vendor/edit/${item.vendorId}`} style={{ color: 'white', textDecoration: 'none',}} className="ml-3">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
  </Link>
</Button>
<Button variant="danger" onClick={()=>DeleteVendor(item.vendorId)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></Button>
</div>

                              
                               
                             
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default AllVendor;