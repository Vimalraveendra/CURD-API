import React from 'react';
import './App.css';
import UserData from '../Components/UserData/UserData';
import CategoryTable from '../Components/CategoryTable/CategoryTable'
import CategoryForm from '../Components/CategoryForm/CategoryForm'



class App extends React.Component{
  state={
    userData:UserData,
    editData:false,
    user:{
      id:null,
      name:'',
      description:''
    }
  }
 
  // adding new category list
  addUserCategory=(user)=>{
    if(!user.id){
    user.id=this.state.userData.length+1
    }
    let newData=[...this.state.userData,user]
    this.setState({userData:newData})
  }

  // Deleting category list based on id
  deleteUser=id=>{
    let newList =this.state.userData.filter(user=>user.id!==id);
    this.setState({userData:newList}) 
  }

  handleChange=(event)=>{
    const {name,value} = event.target;
    const newUser= {...this.state.user,[name]:value};
     this.setState({user:newUser})

}


handleCancel=(e)=>{
  e.preventDefault();
  this.state({editData:!this.state.editData})
}


  editUser=id=>{
    let newList =this.state.userData.filter(user=>user.id!==id)
    const selectedItem = this.state.userData.find(item=>item.id === id)
    this.setState({
      userData:newList,
      user:selectedItem,
      editData:true
    })
    
  }


  render(){ 
    return (
      <div className="container">
      <h1> CRUD APP</h1>
        <div className="row">
          <div className="five columns">
          {this.state.editData?( 
              <div>
              <h2>Edit Category</h2>
                <CategoryForm addUserCategory={this.addUserCategory} handleChange={this.handleChange} user={this.state.user} editData={this.state.editData}/>
                </div>
                ):
                (
                  <div>
                  <h2>Add Category</h2>
                  <CategoryForm addUserCategory={this.addUserCategory} handleChange={this.handleChange} user={this.state.user} handleCancel />
                  </div>
                  )
          }
          </div>
          <div className="seven columns">
            <h2>View Category</h2>
            <CategoryTable userData={this.state.userData} deleteUser={this.deleteUser} editUser={this.editUser} />
          </div>
        </div>
      </div>
    );
  }
}
  


export default App;
