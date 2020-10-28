import React from 'react';
import './CategoryTable.css'
const CategoryTable = ({userData}) => {
   
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
                                    <button className="delete">Delete</button>
                                    <button className="edit">Edit</button>
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