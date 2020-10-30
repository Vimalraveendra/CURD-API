import React from 'react';

import PopupModal from '../../PopupModal/PopupModal'
import FoundationForm from '../FoundationForm/FoundationForm'
import FoundationTable from '../FoundationTable/FoundationTable'

class FoundationHome extends React.Component{
  state={
    dataList:[],
    editData:false,
    isLoading:false,
    isPopup:false,
    popupText:'',
    showComp:false,
  
    user:{
      id:null,
      name:'',
      shortDescription:'',
      htmlDescription:'',
      foundationCategoryId:'', 
      isGlobal: false,
    }
  }
 
  // adding new category list
  addUserCategory=(user)=>{ 
    if(user.name&& user.shortDescription  && user.foundationCategoryId>0){
      
  const newList = [...this.state.dataList]
  let id = [Math.max(...newList.map(num=>num.id))]
  
  if(id[0]===-Infinity){
    user.id=newList.length+1;
  }

  user.isGlobal=true;
  user.foundationCategoryId= Number(user.foundationCategoryId)

  if(!user.id){
  user.id =id[0]+1;

  }
  
   
  for(let data of newList){
  if(data.name ===user.name){
    this.setState({isPopup:true,popupText:"Please provide a Field Name other than  in the list"})
    return true
  }
  
}
    
if(user.name.length>=3&&user.name.length<=128&&user.shortDescription.length<=512){
this.setState({dataList:[...newList,user],user:{id:null,name:'',shortDescription:'',htmlDescription:'',
foundationCategoryId:'',isGlobal:false},editData:false})
}
  }else{
    this.setState({isPopup:true,popupText:"UserName & Description should not be empty & CategoryId greater than one "})
  }
}

  // Deleting category list based on id
  deleteUser=id=>{
    let newList =this.state.dataList.filter(user=>user.id!==id);
    this.setState({dataList:newList}) 
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
  this.setState({editData:false,isEditing:!this.state.isEditing})    
}

// handling edit category
  editUser=id=>{
    let newList =this.state.dataList.filter(user=>user.id!==id)
    const selectedItem = this.state.dataList.find(item=>item.id === id)
    this.setState({
      dataList:newList,
      user:selectedItem,
      editData:true
    })
    
  }

  closePopup = ()=>{
    this.setState({isPopup:!this.state.isPopup})
  }
  showCategory = ()=>{
    this.setState({showComp:!this.state.showComp})

  }

// fetching data from server
async componentDidMount(){
  this.setState({isLoading:!this.state.isLoading})
   try{
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://kjosk-sample-api.azurewebsites.net/api/Foundation`);
    const data = await response.json();
     this.setState({dataList:data,isLoading:false})
   }catch(error){
     console.log("something went wrong!!!")
   }
 }

  render(){ 
    const {editData,isLoading,showComp,dataList,user,isPopup,popupText} = this.state;
    return (
        <>
     <button className="foundation" onClick={this.showCategory}>Foundation List</button> 
     {showComp?
    <div>
     <h2 className='title'>Foundation List</h2> 
     {
      isLoading?
      <h1 className="loading">Loading....</h1>:
    <div className="row">
      <div className="five columns">
      {editData?( 
          <div>
          <h2>Edit Foundation</h2>
            <FoundationForm
             addUserCategory={this.addUserCategory} 
             handleChange={this.handleChange}
              user={user} 
              editData={editData} 
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
              user={user}
      
               />
              
              </div>
              )
      }
      </div>
      <div className="seven columns display">
        <h2>View Foundation</h2>
        <FoundationTable
         userData={dataList} 
         deleteUser={this.deleteUser} 
         editUser={this.editUser} 
         />
      </div>
      {
        isPopup?
        <PopupModal closePopup={this.closePopup} popupText={popupText}/>:
        null
      }
      </div>
     }
      </div>:null
    }
     </>
    );
  }
}
  


export default FoundationHome;
