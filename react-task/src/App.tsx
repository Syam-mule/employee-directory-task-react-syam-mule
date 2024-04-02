import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import EmployeeCategory from './components/Filter/Employeecategory';
import RightContainer from './components/RightsideContainer/EmployeeDetailsCard/Rightsidecontainer';
import IEmployee from './components/Interface/EmployeeInterface';
import {getData}from './services/services'

interface IAppState
{
  employees:IEmployee[];
}
class App extends React.Component<{},IAppState> {
  constructor(props:{})
  {
    super(props)
   this. state = 
    {
 employees:getData(),
    }
  }

  render() {
    return (
      <div className='container'>
           <Header/>
      <div className="row col-lg-12">

            <RightContainer/>  
      </div>
      
      </div>
      
    )
  }
}

export default App;
