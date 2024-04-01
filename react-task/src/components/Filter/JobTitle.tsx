import React, { Component } from 'react';
import  IEmployee  from '../Interface/EmployeeInterface';

interface IEmployeeJobtitleProps {
  employees: IEmployee[];
  selectedJobtitle:(selectedJobtitle:string)=>void;
}

interface IEmployeeJobtitleState {
  employeeJobtitleMap: {[key: string]:number};
  selectedJobTitle: string | null;
}

class EmployeeJobtitle extends React.Component<IEmployeeJobtitleProps, IEmployeeJobtitleState> {
  constructor(props: IEmployeeJobtitleProps) {
    super(props);
    this.state = {
      employeeJobtitleMap: {},
      selectedJobTitle: null,
    };
  }

  componentDidMount() {
    this.updateEmployeeJobtitle();
  }

  componentDidUpdate(prevProps: IEmployeeJobtitleProps) {
    if (prevProps.employees !== this.props.employees) {
      this.updateEmployeeJobtitle();
    }
  }

  updateEmployeeJobtitle() {
    const { employees } = this.props;
    const employeeJobtitleMap: { [key: string]: number } = {};
    employees.forEach((employee) => {
      employeeJobtitleMap[employee.jobtitle] = (employeeJobtitleMap[employee.jobtitle] || 0) + 1;
    });
    this.setState({employeeJobtitleMap});
  }

  handleJobTitleClick = (jobTitle: string) => {
    this.props.selectedJobtitle(jobTitle);
    console.log("color");
  };

  render() {
    const { employeeJobtitleMap} = this.state;
    return (
      <div className="jobtitles">
        {Object.entries(employeeJobtitleMap).map(([jobtitle, count]) => (
          <section key={jobtitle} onClick={() => this.handleJobTitleClick(jobtitle)} style={{cursor: 'pointer'}}>
            {`${jobtitle} (${count})`}
          </section>
        ))}
      </div>
      
    );
  }
}

export default EmployeeJobtitle;
