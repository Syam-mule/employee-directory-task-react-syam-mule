
import React, { Component } from "react";
import IEmployee from "../Interface/EmployeeInterface";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

interface EmployeeContainerProps{
employee:IEmployee[];
isDeleted:()=>void;
}
interface EmployeeContainerState{
    employees:IEmployee[];
}

export class EmployeeContainer extends React.Component<EmployeeContainerProps,EmployeeContainerState> {
    constructor(props:EmployeeContainerProps){
        super(props)

    }
    static getDerivedStateFromProps(props:EmployeeContainerProps)
    {
        return {employees:props.employee}
    }
  
    render() {
      return (
        <div className='employeeContainer row border'>
        {this.state.employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} departmentMap={{}} officerMap={{}} isDeleted={this.props.isDeleted}/>
        ))}
      </div>
      )
    }
  }