import React, { Component } from 'react';
import '../../EmployeeCard/EmployeeCard.css'
import './AlphabetsButtons.css';
import IEmployee from '../../Interface/EmployeeInterface';



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
              className="buttonsBg border"
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

