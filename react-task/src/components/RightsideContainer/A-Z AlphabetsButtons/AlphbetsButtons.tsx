import React, { Component } from 'react';
import '../../EmployeeCard/EmployeeCard.css'
import './AlphabetsButtons.css';
import { getData } from '../../../services/services';

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

interface buttonState {
  filteredEmployees: IEmployee[];
}
interface IButtonProps{
  setFilteredData: (data: string)=>void;
}

class Buttonpagination extends React.Component<IButtonProps,buttonState> {
  constructor(props:IButtonProps) {
    super(props);
    this.state = {
      filteredEmployees: [],
    };
  }

  componentDidMount() {
    const employeeDetails =getData();
    employeeDetails && this.setState({ filteredEmployees: getData() });
  }
  

  setLetter = (x: string) => {
    const letter = x.toLowerCase();
    this.props.setFilteredData(letter);

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
      </div>
    );
  }
}

export default Buttonpagination;

