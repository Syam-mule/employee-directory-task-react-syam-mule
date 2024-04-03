import React, { Component} from 'react';
import  IEmployee  from '../Interface/EmployeeInterface';

interface IEmployeeOfficerProps {
  employees: IEmployee[];
  selectedOfficer:(selectedOfficer:string)=>void;
}

interface IEmployeeOfficeState {
 employeesOfficerMap:{[key: string]:number};
 selectedOfficer:string|null;
}

class EmployeeOfficer extends React.Component<IEmployeeOfficerProps, IEmployeeOfficeState> {
  constructor(props: IEmployeeOfficerProps) {
    super(props);
    this.state = {
      employeesOfficerMap: {},
      selectedOfficer:null,
    };
   
  }

  componentDidMount() {
    this.updateEmployeeOfficer();
  }

  componentDidUpdate(prevProps: IEmployeeOfficerProps) {
    if (prevProps.employees !== this.props.employees) {
      this.updateEmployeeOfficer();
    }
  }

  updateEmployeeOfficer() {
    const { employees } = this.props;
    const employeesOfficerMap: {[key:string]:number} = {};
    employees.forEach((employee) => {
      employeesOfficerMap[employee.officer] = (employeesOfficerMap[employee.officer] || 0) + 1;
    });
    this.setState({employeesOfficerMap});
  }
  
  handleOfficerClick=(officer:string)=>{
    this.props.selectedOfficer(officer);
  };

  render() {
    const { employeesOfficerMap } = this.state;
    return (
      <div className="officers">
        {Object.entries(employeesOfficerMap).map(([officer, count]) => (
          <section key={officer} onClick={()=>this.handleOfficerClick(officer)}>{
            `${officer} (${count})`}
          </section>
        ))}
      </div>
    );
  }
}


export default EmployeeOfficer;



