import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import EmployeeCategory from './components/Filter/Employeecategory';
import RightContainer from './components/RightsideContainer/EmployeeDetailsCard/Rightsidecontainer';
class App extends React.Component {
  
  render() {
    return (
      <div className='container'>
           <Header/>
      <div className="row col-lg-12">
        <div className='col-lg-3'>
            <EmployeeCategory/>
            </div>
            <div className='col-lg-9'>
            <RightContainer/>  
            </div>
      </div>
      
      </div>
      
    )
  }
}

export default App;
