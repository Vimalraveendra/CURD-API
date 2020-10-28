import React from 'react';

const CategoryForm = ({addUserCategory,handleChange,user,editData,handleCancel,userData}) => {
   
    
    // const initialUser = {id: null, name: '', description: ''};

    // const [user, setUser] = useState(initialUser);

    // const handleChange=(event)=>{
    //     const {name,value} = event.target;
    //     setUser({...user,[name]:value})
    // }

    // const [editData,setEditData] = useState(false)

    // const handleCancel =()=>{
    //     setState
    // }

 

    const handleSubmit=(e)=>{
        e.preventDefault();
     if(user.name&& user.description){
         addUserCategory(user)  
         
     }
    }

    return (
        <form>
            <label>Name</label>
            <input className="u-full-width" type="text" name="name" value={user.name} onChange={handleChange}/>
            <label>Description</label>
            <input className="u-full-width" type="text" name="description" value={user.description} onChange={handleChange}/>
            {editData?(
            <div>
            <button className="button-primary" type="submit"  onClick={handleSubmit}>Edit User</button>
            <button className="edit" type="button" onClick={()=>handleCancel(user)} >cancel</button>
            </div>
            ):(
                <button className="button-primary" type="submit" onClick={handleSubmit}>Add User</button>
            )
            }
        </form>
    )
}

export default CategoryForm;