import React from 'react';
import "./FoundationForm.css"
const FoundationForm = ({addUserCategory,handleChange,user,editData,handleCancel}) => {



    const handleSubmit=(e)=>{
        e.preventDefault();
     if(user.name&& user.description){
         addUserCategory(user)  
         
     }
    }

    return (
        <form>
            <label>Name</label>
            <input className="u-full-width" type="text" name="name" value={user.name} onChange={handleChange} />
            <label>Description</label>
            <input className="u-full-width" type="text" name="description" value={user.description} onChange={handleChange}/>
            <label>Html Description</label>
            <input className="u-full-width" type="text" name="description" value={user.description} onChange={handleChange}/>
            <label>Category Id</label>  
            <input className="u-full-width" type="text" name="description" value={user.description} onChange={handleChange}/>
            {editData?(
            <div>
            <button className="button-primary" type="submit"  onClick={handleSubmit}>Edit User</button>
            <button className="cancel" type="button" onClick={()=>handleCancel(user)} >cancel</button>
            </div>
            ):(
                <button className="button-primary" type="submit" onClick={handleSubmit}>Add User</button>
            )
            }
        </form>
    )
}

export default FoundationForm;

