import React, { Component } from 'react';
import profile from '../../resources/images/profile.jpg';
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

interface IEmployeeJobtitleProps {
  employees: IEmployee[];
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
    this.setState((prevState) => ({
      selectedJobTitle: prevState.selectedJobTitle === jobTitle ? null : jobTitle,
    }));
    console.log("jobtitleclick");
  };

  render() {
    const { employeeJobtitleMap, selectedJobTitle } = this.state;
    const { employees } = this.props;

    return (
      <div className="jobtitles">
        {Object.entries(employeeJobtitleMap).map(([jobtitle, count]) => (
          <section key={jobtitle} onClick={() => this.handleJobTitleClick(jobtitle)} style={{cursor: 'pointer'}}>
            {`${jobtitle} (${count})`}
          </section>
        ))}
        {/* <div className='employeeContainer  border'>
          {selectedJobTitle && employees
            .filter((employee) => employee.jobtitle === selectedJobTitle)
            .map((employee, index) => (
              <div className="col-md-4 col-xl-3 specification text-secondary cardalign p-2">
                <div className="card">
                  <div className="card-block d-flex">
                    <div className="image">
                      <img className="employeeImg p-2" src={profile} alt="Employee"/>
                    </div>
                    <div className="employeeDetails mt-1 p-1">
                      <section>{employee.firstname} {employee.lastname}</section>
                      <section>{employee.jobtitle}</section>
                      <section className="employeeDept">{employee.department}</section>
                      <button className="icon"><i className="fa fa-phone"></i></button>
                      <i className="fa fa-envelope emails p-1"></i>
                      <i className="fa fa-comment emails p-1"></i>
                      <i className="fa fa-star emails p-1"></i>
                      <i className="fa fa-heart emails p-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div> */}
      </div>
      
    );
  }
}

export default EmployeeJobtitle;
