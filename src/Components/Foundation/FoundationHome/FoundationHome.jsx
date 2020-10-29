import React from 'react';

import PopupModal from '../../PopupModal/PopupModal'
import FoundationForm from '../FoundationForm/FoundationForm'
import FoundationTable from '../FoundationTable/FoundationTable'

class FoundationHome extends React.Component{
  state={
    foundationData:[],
    editData:false,
    isLoading:false,
    isPopup:false,
    showComp:false,
    user:{
      id:null,
      name:'',
      description:'',
      html:'',
      categoryId:null
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
        
    <div className="row">
      <div className="five columns">
      {this.state.editData?( 
          <div>
          <h2>Edit Foundation</h2>
            <FoundationForm
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
              <h2>Add Foundation</h2>
              <FoundationForm 
              addUserCategory={this.addUserCategory} 
              handleChange={this.handleChange} 
              user={this.state.user}
               />
              
              </div>
              )
      }
      </div>
      <div className="seven columns display">
        <h2>View Foundation</h2>
        <FoundationTable
         userData={this.state.foundationData} 
         deleteUser={this.deleteUser} 
         editUser={this.editUser} 
         />
      </div>
      {
        this.state.isPopup?
        <PopupModal closePopup={this.closePopup}/>:
        null
      }
      </div>
     
    );
  }
}
  


export default FoundationHome;
