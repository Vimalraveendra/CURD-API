import React from 'react';
import './App.scss';
// import UserData from '../Components/UserData/UserData';
import CategoryTable from '../Components/FoundationCategory/CategoryTable/CategoryTable'
import CategoryForm from '../Components/FoundationCategory/CategoryForm/CategoryForm'
import PopupModal from '../Components/PopupModal/PopupModal'
import FoundationHome from '../Components/Foundation/FoundationHome/FoundationHome'


class App extends React.Component{
  state={
    userData:[],
    editData:false,
    isLoading:false,
    isPopup:false,
    popupText:'',
    showComp:false,
    index:'',
    action:0,
    user:{
      id:null,
      name:'',
      description:''
    }
  }
 
  // adding new category list
  addUserCategory=(user)=>{ 
 
  const newList = this.state.userData;
  
 
  if(user.name&& user.description){
 
  let id = [Math.max(...newList.map(num=>num.id))]
 

  if(id[0]===-Infinity){
    user.id=newList.length+1;
  }

  if(!user.id){
  user.id =id[0]+1;
  }


    
  for(let data of newList){
  if(data.name ===user.name){
    this.setState({isPopup:true,popupText:"Please provide a Field Name other than  in the list"})
    return true
  }
}

if(user.name.length>=3&&user.name.length<=128&&user.description.length<=512){
   if(this.state.action!==0){
    let index = this.state.index;
    newList[index]=user;
   this.setState({userData:newList,user:{id:null,name:'',description:''},editData:false,action:0})
}else{
  let newUser =[...newList,user]
this.setState({userData:newUser,user:{id:null,name:'',description:''},editData:false})
}
}
  }else{
    this.setState({isPopup:true,popupText:"UserName & Description should not be empty"})
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
handleCancel=()=>{
  this.setState({
    editData:false,
    action:0,
     index:'',
    user:{id:null, name:'',description:''}})    
}

// handling edit category
  editUser=(index,id)=>{
  
    // let newList =this.state.userData.filter(user=>user.id!==id)
    const selectedItem = this.state.userData.find(item=>item.id === id)
    this.setState({
      index:index,
      action:1,
      user:selectedItem,
      editData:true
    })

  }

  // closing the PopupModal window
  closePopup = ()=>{
    this.setState({isPopup:!this.state.isPopup})
  }
  // showing component based on the button clicking
  showCategory = ()=>{
    this.setState({showComp:!this.state.showComp})

  }

// making APi call
 async componentDidMount(){
  this.setState({isLoading:!this.state.isLoading})
   try{
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://kjosk-sample-api.azurewebsites.net/api/FoundationCategory`);
    const data = await response.json();
     this.setState({userData:data,isLoading:false})
   }catch(error){
     console.log("something went wrong!!!")
   }
 }

  render(){ 
   const {editData,isLoading,showComp,userData,user,isPopup,popupText} = this.state;
    return (
      <div className="container">
      <h1> CRUD APP</h1>
      <button className="foundation" onClick={this.showCategory}>Foundation Category</button>
      {showComp?
      <div>
      <h2 className='title'>Foundation Category List</h2>
      {
        isLoading?
        <h1 className="loading">Loading....</h1>:
        <div className="row">
         <div className="five columns">
         {editData?( 
             <div>
             <h2>Edit Category</h2>
               <CategoryForm
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
                 <h2>Add Category</h2>
                 <CategoryForm 
                 addUserCategory={this.addUserCategory} 
                 handleChange={this.handleChange} 
                 user={user}
                  />
                 
                 </div>
                 )
         }
         </div>
         <div className="seven columns display">
           <h2>View Category</h2>
           <CategoryTable
            userData={userData} 
            deleteUser={this.deleteUser} 
            editUser={this.editUser} 
            />
         </div>
       </div>
       
      }{
        isPopup?
        <PopupModal closePopup={this.closePopup} popupText={popupText}/>:
        null
      }
    
     
    </div>:null
      }
      
      
      <div className="row"><FoundationHome  handleChange={this.handleChange}/></div>
      
     
      </div>
    );
  }
}
  


export default App;
