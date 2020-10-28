import React from 'react';
import './App.css';
import UserData from '../Components/UserData/UserData';
import CategoryTable from '../Components/CategoryTable/CategoryTable'


class App extends React.Component{
  state={
    userData:UserData
  }
 
  render(){
    return (
      <div className="container">
      <h1>React CRUD App</h1>
        <div className="row">
          <div className="five columns">
            <h2>Add Category</h2>
          </div>
          <div className="seven columns">
            <h2>View Category</h2>
            <CategoryTable userData={this.state.userData}/>
          </div>
        </div>
      </div>
    );
  }
}
  


export default App;
