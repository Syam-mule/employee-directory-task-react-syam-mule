import React, { Component } from "react";
import IEmployee from "../Interface/EmployeeInterface";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

interface EmployeeContainerProps {
  employee: IEmployee[];
  isDeleted: () => void;
}

interface EmployeeContainerState {
  employees: IEmployee[];
}

export class EmployeeContainer extends React.Component<EmployeeContainerProps, EmployeeContainerState> {
  constructor(props: EmployeeContainerProps) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  static getDerivedStateFromProps(props: EmployeeContainerProps) {
    return { employees: props.employee };
  }

  render() {
    const { employees } = this.state;

    return (
      <div className='employeeContainer row border'>
        {employees.length === 0 ? (
          <p className="errorMsg fs-3 fw-bold">No employee details found.</p>
        ) : (
          employees.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} departmentMap={{}} officerMap={{}} isDeleted={this.props.isDeleted} />
          ))
        )}
      </div>
    );
  }
}
