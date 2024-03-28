import React, { Component } from "react";
import EmployeeDepartments from "./Department";
import '../../components/EmployeeCard/EmployeeCard.css';
import EmployeeJobtitle from "./JobTitle";
import EmployeeOfficer from "./Officers";
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

interface IDepartmentMap {
  [key: string]: number;
}

interface IEmployeeDetails{
   employees: IEmployee[];
   departmentMap: IDepartmentMap
}
class EmployeeCategory extends React.Component<{}, IEmployeeDetails> {
  constructor(props: {}) {
    super(props);
    this.state = {
      employees: [],
      departmentMap: {}
    };
  }

  componentDidMount() {
    const employeesData = localStorage.getItem("employees");
    if (employeesData) {
      const employees = JSON.parse(employeesData);
      this.setState({employees}, () => {
        this.updateDepartmentMap();
      });
    }
  }

  updateDepartmentMap() {
    const departmentMap: { [key: string]: number } = {};
    this.state.employees.forEach((employee) => {
      departmentMap[employee.department] = (departmentMap[employee.department] || 0) + 1;
    });
    this.setState({departmentMap});
  }

  render() {
    const { employees} = this.state;

    return (
      <div className="leftcontainer">
        <div className="mt-4">
          <h6>Department</h6>
          <div className="specification">
          <EmployeeDepartments employees={employees} />
          </div>

          <div className="mt-3">
            <h6>Offices</h6>
            <EmployeeOfficer employees={employees}/>
          </div>

          <div className="mt-3">
            <h6>Job Titles</h6>
            <div className="text-secondary specification"></div>
            <EmployeeJobtitle employees={employees}/>
          </div>
        </div>
        <a className="link" href="#">
          view more
        </a>
      </div>
    );
  }
}

export default EmployeeCategory;

