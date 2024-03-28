import React, { Component } from 'react';
import profile from '../..//resources/images/profile.jpg';
import  IEmployee  from '../Interface/EmployeeInterface';

// interface Employee {
//   firstname: string;
//   lastname: string;
//   email: string;
//   department: string;
//   jobtitle: string;
//   phonenumber: string;
//   skypeid: string;
//   officer: string;
// }

interface EmployeeDepartmentProps {
  employees: IEmployee[];
}

interface EmployeeDepartmentState {
  employeeDepartmentMap: { [key: string]: IEmployee[] };
  selectedDepartment: string | null;
}

class EmployeeDepartment extends React.Component<EmployeeDepartmentProps, EmployeeDepartmentState> {
  constructor(props: EmployeeDepartmentProps) {
    super(props);
    this.state = {
      employeeDepartmentMap: {},
      selectedDepartment: null,
    };
  }

  componentDidMount() {
    this.updateEmployeeDepartment();
  }

  componentDidUpdate(prevProps: EmployeeDepartmentProps) {
    if (prevProps.employees !== this.props.employees) {
      this.updateEmployeeDepartment();
    }
  }

  updateEmployeeDepartment() {
    const { employees } = this.props;
    const employeeDepartmentMap: { [key: string]: IEmployee[] } = {};
    employees.forEach((employee) => {
      if (!employeeDepartmentMap[employee.department]) {
        employeeDepartmentMap[employee.department] = [];
      }
      employeeDepartmentMap[employee.department].push(employee);
    });

    this.setState({ employeeDepartmentMap });
  }

  handleDepartmentClick = (department: string) => {
    this.setState((prevState) => ({
      selectedDepartment: prevState.selectedDepartment === department ? null : department,
    }));
  };

  render() {
    const { employeeDepartmentMap, selectedDepartment } = this.state;

    console.log(selectedDepartment);
    return (
      <div className="departments">
        {Object.entries(employeeDepartmentMap).map(([department, employees]) => (
          <section key={department} onClick={() => this.handleDepartmentClick(department)} style={{ cursor: 'pointer' }}>
            {`${department} (${employees.length})`}
          </section>
        ))}


        {/* <div className='employeeContainer border'>
          {selectedDepartment && employeeDepartmentMap[selectedDepartment] &&
            employeeDepartmentMap[selectedDepartment].map((employee, index) => (
              <div key={index} className="col-md-4 col-xl-3 specification text-secondary cardalign p-2">
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

export default EmployeeDepartment;

