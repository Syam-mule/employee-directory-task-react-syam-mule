import React, { Component } from "react";
import RegistrationForm from "../../Form/RegistrationForm/RegistrationForm";
import './Rightsidecontainer.css';
import Buttonpagination from "../A-Z AlphabetsButtons/AlphbetsButtons";
import Searchfilter from "../SearchFilter/SearchFilter";
import  IEmployee  from '../../Interface/EmployeeInterface';
import { EmployeeContainer } from "../../EmployeeContainer/EmployeeContainer";
import EmployeeCategory from "../../Filter/Employeecategory";
import { getData } from "../../../services/services";

interface IRightsideComponentState {
  isRegistrationOpen: boolean;
  employees: IEmployee[];
  filteredData: IEmployee[];
}

class RightsideComponent extends Component<{}, IRightsideComponentState> {
  handlerSearchFilter: any;
  constructor(props:{}) {
    super(props);
    this.state = {
      isRegistrationOpen: false,
      employees: JSON.parse(localStorage.getItem('employees')||"[]"),
      filteredData: [],
    };
  }

  handleData = () =>{
    const employeeDetails: any = localStorage.getItem("employees");
    this.setState({employees: JSON.parse(employeeDetails), filteredData:JSON.parse(employeeDetails) })
  }

  handleFilteredData = (data: string)=>{
    const employeeDetails: any = localStorage.getItem("employees");
    let alpha = JSON.parse(employeeDetails).filter((emp:IEmployee)=>emp.firstname.toLowerCase().startsWith(data));
    console.log(alpha);
     this.setState({employees:alpha});
  }

  toggleRegistration = () => {
    this.setState((prevState) => ({
      isRegistrationOpen: !prevState.isRegistrationOpen,
    }));
  };

  handleDepartment = (department:string)=>{
    let filteredEmployees = getData().filter((emp:IEmployee)=>emp.department==department);
    this.setState({employees:filteredEmployees},()=>{console.log(this.state.employees)});
}
  
handleJobtitle=(jobtitle:string)=>{
  let filteredjobEmployees =getData().filter((emp:IEmployee)=>emp.jobtitle==jobtitle);
  this.setState({employees:filteredjobEmployees},()=>{console.log(this.state.employees)});
}

handleofficer=(officer:string)=>{
  let filteredofficerEmployees = getData().filter((emp:IEmployee)=>emp.officer==officer);
  this.setState({employees:filteredofficerEmployees},()=>{console.log(this.state.employees)});
}



filteringCards= (searchingText:string,seachingElement:keyof IEmployee)=>{
 let filteringCards= getData().filter((emp:IEmployee)=>emp[seachingElement].toLowerCase().includes(searchingText));
 this.setState({employees:filteringCards})
}

deletedEmployees =()=>{
  this.setState({employees:getData()})
}
  render() {
    const { isRegistrationOpen} = this.state;
    return (
      <div className='d-flex'> 
          <div className='col-lg-3'>
              <EmployeeCategory selectedDepartment={this.handleDepartment} selectedJobtitle={this.handleJobtitle} selectedEmployeeOfficer={this.handleofficer}/>
          </div>
          <div className="mt-3 rightcontainer">  
            <button type="button" className="buttonsBg border userbutton">
          <i className="fa fa-user"></i>
          </button>
          <div className="buttons">
            <Buttonpagination setFilteredData={this.handleFilteredData}/>
          </div>

        <div className="col-lg-12 rightcontainer">
          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Searchfilter filteringCards = {this.filteringCards}/>

                <button className="addemployeebtn mt-2 border-0" onClick={this.toggleRegistration}>
                  Add Employee 
                  </button>
                {isRegistrationOpen && <RegistrationForm handleAddBtnClick={this.handleData}/>}
                
              </ul>
            </div>
          </nav>

          <div className="container3">
            <p className="specification mt-2">
              <b className="note">Note:</b> Please use the advanced filter options to refine your
            </p>
          </div>
         
           
            <EmployeeContainer employee = {this.state.employees} isDeleted={this.deletedEmployees}/>

        </div>   
      </div>
      </div>
     
    );
  }
}

export default RightsideComponent;



