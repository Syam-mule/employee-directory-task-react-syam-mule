import React, { Component } from "react";
import EmployeeDepartments from "./Department";
import '../../components/EmployeeCard/EmployeeCard.css';
import EmployeeJobtitle from "./JobTitle";
import EmployeeOfficer from "./Officers";
import  IEmployee  from '../Interface/EmployeeInterface';
import { getData } from "../../services/services";



interface IDepartmentMap {
  [key: string]: number;
  
}
interface IEmployeeCategoryProps
{
  selectedDepartment:(selectedDepartment:string)=>void;
  selectedJobtitle:(selectedJobtitle:string)=>void;
  selectedEmployeeOfficer:(selectedOfficer:string)=>void;
}

interface IEmployeeDetails{
   employees: IEmployee[];
   departmentMap: IDepartmentMap
}
class EmployeeCategory extends React.Component<IEmployeeCategoryProps, IEmployeeDetails> {
  constructor(props:IEmployeeCategoryProps) {
    super(props);
    this.state = {
      employees: [],
      departmentMap: {}
    };
  }

 
componentDidMount() {
  const employeeDetails = getData();
  employeeDetails && this.setState({ employees: getData() },
   this.updateDepartmentMap);
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
          <EmployeeDepartments employees={employees} selectedDepartment={this.props.selectedDepartment}/>
          </div>

          <div className="mt-3">
            <h6>Offices</h6>
            <EmployeeOfficer employees={employees} selectedOfficer={this.props.selectedEmployeeOfficer}/>
          </div>

          <div className="mt-3">
            <h6>Job Titles</h6>
            <div className="text-secondary specification"></div>
            <EmployeeJobtitle employees={employees} selectedJobtitle={this.props.selectedJobtitle}/>
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

