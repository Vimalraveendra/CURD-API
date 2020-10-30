import React from 'react';
import "./FoundationForm.scss"
const FoundationForm = ({addUserCategory,handleChange,user,editData,handleCancel}) => {



    const handleSubmit=(e)=>{
        e.preventDefault();
         addUserCategory(user) 
         
    }

    return (
        <form>
            <label>Name</label>
            <input className="u-full-width" type="text" name="name" value={user.name} onChange={handleChange} />
            <label>Description</label>
            <input className="u-full-width" type="text" name="shortDescription" value={user.shortDescription} onChange={handleChange}/>
            <label>Html Description</label>
            <input className="u-full-width" type="text" name="htmlDescription" value={user.htmlDescription} onChange={handleChange}/>
            <label>CategoryId</label>  
            <input className="u-full-width" type="number"  name="foundationCategoryId" value={user.foundationCategoryId} onChange={handleChange}/>
            {editData?(
            <div>
            <button className="button-primary" type="submit"  onClick={handleSubmit}>Edit User</button>
            <button className="cancel" type="button" onClick={()=>handleCancel({user})} >cancel</button>
            </div>
            ):(
                <button className="button-primary" type="submit" onClick={handleSubmit}>Add User</button>
            )
            }
        </form>
    )
}

export default FoundationForm;

