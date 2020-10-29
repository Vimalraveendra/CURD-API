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
  const newList = [...this.state.userData]

  if(!user.id){
  user.id =newList.length+1;
  }
    
  for(let data of newList){
  if(data.name ===user.name || data.description===user.description){
    return true
  }
  this.setState({user:{id:null,name:'',description:''}})
}
this.setState({userData:[...newList,user],user:{id:null,name:'',description:''},editData:false})

  }

  // Deleting category list based on id
  deleteUser=id=>{
    let newList =this.state.userData.filter(user=>user.id!==id);
    this.setState({userData:newList}) 
  }

  // dynamically handling input events 
  handleChange=(event)=>{
    const {name,value} = event.target;
    const newUser= {...this.state.user,[name]:value};
     this.setState({user:newUser})

}

// handling when user cancel the edit category
handleCancel=(data)=>{
  this.addUserCategory(data)
  this.setState({editData:false})    
}

// handling edit category
  editUser=id=>{
    let newList =this.state.userData.filter(user=>user.id!==id)
    const selectedItem = this.state.userData.find(item=>item.id === id)
    this.setState({
      userData:newList,
      user:selectedItem,
      editData:true
    })
    
  }

//  async componentDidMount(){
//    try{
//     const response = await fetch(`https://cors-anywhere.herokuapp.com/https://kjosk-sample-api.azurewebsites.net/api/FoundationCategory`);
//     const data = await response.json();
   
//      this.setState({userData:data})
//    }catch(error){
//      console.log("something went wrong!!!")
//    }
//  }

  render(){ 
    return (
      <div className="container">
      <h1> CRUD APP</h1>
        <div className="row">
          <div className="five columns">
          {this.state.editData?( 
              <div>
              <h2>Edit Category</h2>
                <CategoryForm
                 addUserCategory={this.addUserCategory} 
                 handleChange={this.handleChange}
                  user={this.state.user} 
                  editData={this.state.editData} 
                  handleCancel={this.handleCancel} 
                 
                  />
                </div>
                ):
                (
                  <div>
                  <h2>Add Category</h2>
                  <CategoryForm 
                  addUserCategory={this.addUserCategory} 
                  handleChange={this.handleChange} 
                  user={this.state.user}
                   />
                  
                  </div>
                  )
          }
          </div>
          <div className="seven columns display">
            <h2>View Category</h2>
            <CategoryTable
             userData={this.state.userData} 
             deleteUser={this.deleteUser} 
             editUser={this.editUser} 
             />
          </div>
        </div>
      </div>
    );
  }
}
  


export default App;
