import React from 'react';
import './App.css';
import UserData from '../Components/UserData/UserData';
import CategoryTable from '../Components/FoundationCategory/CategoryTable/CategoryTable'
import CategoryForm from '../Components/FoundationCategory/CategoryForm/CategoryForm'
import PopupModal from '../Components/PopupModal/PopupModal'
// import FoundationForm from '../Components/Foundation/FoundationForm/FoundationForm'
// import FoundationTable from '../Components/Foundation/FoundationTable/FoundationTable'
import FoundationHome from '../Components/Foundation/FoundationHome/FoundationHome'


class App extends React.Component{
  state={
    userData:UserData,
    editData:false,
    isLoading:false,
    isPopup:false,
    showComp:false,
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
    this.setState({isPopup:true})
    return true
  }
  
}

if(user.name.length>=3&&user.name.length<=128){
this.setState({userData:[...newList,user],user:{id:null,name:'',description:''},editData:false})
}
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

  closePopup = ()=>{
    console.log("hello")
    this.setState({isPopup:!this.state.isPopup})
  }
  showCategory = ()=>{
    this.setState({showComp:!this.state.showComp})

  }

//  async componentDidMount(){
//   this.setState({isLoading:!this.state.isLoading})
//    try{
//     const response = await fetch(`https://cors-anywhere.herokuapp.com/https://kjosk-sample-api.azurewebsites.net/api/FoundationCategory`);
//     const data = await response.json();
//       console.log("data",data)  
//      this.setState({userData:data,isLoading:false})
//    }catch(error){
//      console.log("something went wrong!!!")
//    }
//  }
// async componentDidMount(){
//   this.setState({isLoading:!this.state.isLoading})
//    try{
//     const response = await fetch(`https://cors-anywhere.herokuapp.com/https://kjosk-sample-api.azurewebsites.net/api/Foundation`);
//     const data = await response.json();
//       console.log("data",data)  
//      this.setState({foundationData:data,isLoading:false})
//    }catch(error){
//      console.log("something went wrong!!!")
//    }
//  }
  render(){ 
   
    return (
      <div className="container">
      <h1> CRUD APP</h1>
      <button onClick={this.showCategory}>Foundation Category</button>
      {this.state.showComp?
      <div>
      <h2 className='title'>Foundation Category List</h2>
      {
        this.state.isLoading?
        <h1 className="loading">Loading....</h1>:
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
       
      }{
        this.state.isPopup?
        <PopupModal closePopup={this.closePopup}/>:
        null
      }
    
     
    </div>:null
      }
      
      <h2 className='title'>Foundation List</h2>
    
      <div className="row"><FoundationHome/></div>
      
     
      </div>
    );
  }
}
  


export default App;
