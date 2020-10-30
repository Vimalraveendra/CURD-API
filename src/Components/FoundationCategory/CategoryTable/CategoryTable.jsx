import React from 'react';
import './CategoryTable.scss'
const CategoryTable = ({userData,deleteUser,editUser}) => {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { userData.length > 0 ? (
                    userData.map(({id,name,description})=> {
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{description}</td>
                                <td>

                                    <button className="edit" onClick={()=>editUser(id)}><i className="far fa-edit"></i></button>
                                    <button className="delete" onClick={()=>deleteUser(id)}><i className="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No users found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default CategoryTable;