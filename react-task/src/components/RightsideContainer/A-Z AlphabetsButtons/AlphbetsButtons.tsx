import React, { Component } from 'react';
import '../../EmployeeCard/EmployeeCard.css'
import './AlphabetsButtons.css';
import EmployeeCard from '../../EmployeeCard/EmployeeCard';

interface IEmployee {
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  jobtitle: string;
  phonenumber: string;
  skypeid: string;
  officer: string;
}

interface State {
  filteredEmployees: IEmployee[];
}

class Buttonpagination extends React.Component<{},State> {
  constructor(props:{}) {
    super(props);
    this.state = {
      filteredEmployees: [],
    };
  }

  componentDidMount() {
    const employeeDetails = localStorage.getItem('employees');
    if (employeeDetails) {
      const employeeList: IEmployee[] = JSON.parse(employeeDetails);
      this.setState({ filteredEmployees: employeeList });
    }
  }

  setLetter = (x: string) => {
    const letter = x.toLowerCase();
    const employeeList: IEmployee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    const filterByLetter = employeeList.filter(employee => employee.firstname.toLowerCase().startsWith(letter));
    this.setState({ filteredEmployees: filterByLetter });
  };

  render() {
    const alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
    return (
      <div>
        <div className="alphabetbuttons d-flex">
          {alphabet.map(letter => (
            <button
              key={letter}
              type="button"
              className="buttonsBg border me-2"
              onClick={() => this.setLetter(letter)}>
              {letter}
            </button>
          ))}
        </div>
        {/* <div className='employeeContainer row '>
        {this.state.filteredEmployees.map((employee, index) => (
          <div key={index} className="p-1">
            <EmployeeCard key={employee.firstname} employee={employee} departmentMap={{}} officerMap={{}} />
          </div>
        ))}
      </div> */}
      </div>
    );
  }
}

export default Buttonpagination;

