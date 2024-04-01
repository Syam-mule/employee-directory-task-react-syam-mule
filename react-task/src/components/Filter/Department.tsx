import React, { Component, useState} from 'react';
import  IEmployee  from '../Interface/EmployeeInterface';


interface EmployeeDepartmentProps {
  employees: IEmployee[];
  selectedDepartment:(selectedDepartment:string)=>void;
}


interface EmployeeDepartmentState {
  employeeDepartmentMap: { [key: string]: IEmployee[] };
  selectedDepartment: string | null;
  DepartmentFilteredEmployee:IEmployee[];
}


class EmployeeDepartment extends React.Component<EmployeeDepartmentProps, EmployeeDepartmentState> {
  constructor(props: EmployeeDepartmentProps) {
    super(props);
    this.state = {
      employeeDepartmentMap: {},
      selectedDepartment: null,
       DepartmentFilteredEmployee:[],
      
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
    this.props.selectedDepartment(department);
  }

  render() {
    const { employeeDepartmentMap} = this.state;
    return (
      <div className="departments">
        {Object.entries(employeeDepartmentMap).map(([department, employees]) => (
          <section key={department} onClick={() => this.handleDepartmentClick(department)}  style={{ cursor: 'pointer'}}>
            {`${department} (${employees.length})`}
          </section>
        ))}

      </div>
    );
  }
}

export default EmployeeDepartment;



