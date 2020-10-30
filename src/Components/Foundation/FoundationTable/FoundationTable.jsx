import React from 'react';
import './FoundationTable.css'
const FoundationTable = ({userData,deleteUser,editUser}) => {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>HTML</th>
                    <th>CategoryID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { userData.length > 0 ? (
                    userData.map(({id,name,shortDescription,htmlDescription,foundationCategoryId},index)=> {
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{shortDescription}</td>
                                <td>{htmlDescription}</td>
                                <td>{foundationCategoryId}</td>
                                <td>
                                    <button className="edit" onClick={()=>editUser(id,index)}><i className="far fa-edit"></i></button>
                                    <button className="delete" onClick={()=>deleteUser(id)}><i className="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={6}>No users found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default FoundationTable;