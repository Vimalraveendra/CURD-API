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
     
  const newList = [...this.state.dataList]
  let id = [Math.max(...newList.map(num=>num.id))]
  user.isGlobal=true;
  user.foundationCategoryId= Number(user.foundationCategoryId)
  if(!user.id){
  user.id =id[0]+1;

  }
  
   
  for(let data of newList){
  if(data.name ===user.name){
    this.setState({isPopup:true})
    return true
  }
  
}

if(user.name.length>=3&&user.name.length<=128&&user.shortDescription.length<=512){
this.setState({dataList:[...newList,user],user:{id:null,name:'',shortDescription:'',htmlDescription:'',
foundationCategoryId:'',isGlobal:false},editData:false})
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
  this.setState({editData:false})    
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
   
    return (
     <> 
     <button className="foundation" onClick={this.showCategory}>Foundation List</button> 
     {this.state.showComp?
    <div>
     <h2 className='title'>Foundation List</h2> 
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
         userData={this.state.dataList} 
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
    
      </div>:null
    }
     </>
    );
  }
}
  


export default FoundationHome;
