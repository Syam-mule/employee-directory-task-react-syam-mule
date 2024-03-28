import React, { Component } from "react";
import RegistrationForm from "../../Form/RegistrationForm/RegistrationForm";
import EmployeeCard from "../../EmployeeCard/EmployeeCard";
import './Rightsidecontainer.css';
import Buttonpagination from "../A-Z AlphabetsButtons/AlphbetsButtons";
import Searchfilter from "../SearchFilter/SearchFilter";
import  IEmployee  from '../../Interface/EmployeeInterface';


interface IRightsideComponentState {
  isRegistrationOpen: boolean;
  employees: IEmployee[];
}

class RightsideComponent extends Component<{}, IRightsideComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isRegistrationOpen: false,
      employees: [],
    };
  }

  componentDidMount() {
    const employeeDetails = localStorage.getItem("employees");
    if (employeeDetails) {
      const employees: IEmployee[] = JSON.parse(employeeDetails);
      this.setState({ employees });
    }
  }

  toggleRegistration = () => {
    this.setState((prevState) => ({
      isRegistrationOpen: !prevState.isRegistrationOpen,
    }));
  };

  render() {
    const { isRegistrationOpen, employees} = this.state;
    return (
      <div className="mt-5 rightcontainer">
        {/* <button type="button" className="buttonsBg border">
          <i className="fa fa-user"></i>
        </button> */}
        <div className="buttons">
        <Buttonpagination/>
        </div>

        <div className="col-lg-12 rightcontainer">
          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Searchfilter employees={employees}/>

                <button className="addemployeebtn mt-2 border-0 " data-toggle="modal" data-target="#exampleModal" onClick={this.toggleRegistration}>
                  Add Employee 
                </button>
                {isRegistrationOpen && <RegistrationForm/>}
              </ul>
            </div>
          </nav>

          <div className="container3">
            <p className="specification mt-2">
              <b className="note">Note:</b> Please use the advanced filter options to refine your
            </p>
          </div>
          <div className='employeeContainer row border'>
            {employees.map((employee, index) => (
              <EmployeeCard key={index} employee={employee} departmentMap={{}} officerMap={{}}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RightsideComponent;



