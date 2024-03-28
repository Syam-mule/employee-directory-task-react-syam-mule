import React, { Component } from 'react';
import profile from '../../resources/images/profile.jpg';
import  IEmployee  from '../Interface/EmployeeInterface';
 
// interface IEmployee {
//   firstname: string;
//   lastname: string;
//   email: string;
//   department: string;
//   jobtitle: string;
//   phonenumber: string;
//   skypeid: string;
//   officer: string;
// }

interface IEmployeeOfficerProps {
  employees: IEmployee[];
}

interface IEmployeeOfficeState {
 employeesOfficerMap:{[key: string]: number};
 selectedOfficer:string|null;
}

class EmployeeOfficer extends React.Component<IEmployeeOfficerProps, IEmployeeOfficeState> {
  constructor(props: IEmployeeOfficerProps) {
    super(props);
    this.state = {
      employeesOfficerMap: {},
      selectedOfficer:null
    };
  }

  componentDidMount() {
    this.updateOfficerMap();
  }

  componentDidUpdate(prevProps: IEmployeeOfficerProps) {
    if (prevProps.employees !== this.props.employees) {
      this.updateOfficerMap();
    }
  }

  updateOfficerMap() {
    const { employees } = this.props;
    const employeesOfficerMap: {[key:string]:number} = {};
    employees.forEach((employee) => {
      employeesOfficerMap[employee.officer] = (employeesOfficerMap[employee.officer] || 0) + 1;
    });
    this.setState({employeesOfficerMap});
  }
  
  handleOfficerClick=(officer:string)=>{
    this.setState((prevState) => ({
      selectedOfficer:prevState.selectedOfficer ===officer ? null : officer,
    }));
    console.log(officer);
  };

  render() {
    const { employeesOfficerMap,selectedOfficer } = this.state;
    const {employees} = this.props;
    return (
      <div className="officers">
        {Object.entries(employeesOfficerMap).map(([officer, count]) => (
          <section key={officer} onClick={()=>this.handleOfficerClick(officer)} style={{cursor:'pointer'}}>{
            `${officer} (${count})`}
          </section>
        ))}
      {/* <div className='employeeContainer  border'>
          {selectedOfficer && employees
            .filter((employee) => employee.officer === selectedOfficer)
            .map((employee) => (
              <div className="col-md-4 col-xl-3 specification text-secondary cardalign p-2">
                <div className="card">
                  <div className="card-block d-flex">
                    <div className="image">
                      <img className="employeeImg p-2" src={profile} alt="Employee"/>
                    </div>
                    <div className="employeeDetails mt-1 p-1">
                      <section>{employee.firstname} {employee.lastname}</section>
                      <section>{employee.jobtitle}</section>
                      <section className="employeeDept">{employee.department}</section>
                      <button className="icon"><i className="fa fa-phone"></i></button>
                      <i className="fa fa-envelope emails p-1"></i>
                      <i className="fa fa-comment emails p-1"></i>
                      <i className="fa fa-star emails p-1"></i>
                      <i className="fa fa-heart emails p-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div> */}
      </div>
    );
  }
}


export default EmployeeOfficer;



