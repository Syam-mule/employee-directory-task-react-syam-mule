import React, { Component } from 'react';
import profile from '../../resources/images/profile.jpg';
import EditForm from '../Form/EditForm/EditEmployee';
import { setData } from '../../services/services';
import IEmployee from '../Interface/EmployeeInterface';


interface IEmployeeCardProps {
  employee: IEmployee;
  departmentMap: { [key: string]: number };
  officerMap: { [key: string]: number };
  isDeleted:()=>void;
}

interface IEmployeeCardState {
  showEmployeeDetails: boolean;
  showEditForm: boolean;
  editEmployeeDetails: IEmployee | null;
}

class EmployeeCard extends React.Component<IEmployeeCardProps, IEmployeeCardState> {
  constructor(props: IEmployeeCardProps) {
    super(props);
    this.state = {
      showEmployeeDetails: false,
      showEditForm: false,
      editEmployeeDetails: null,
    };
  }

  toggleEmployeeDetails = () => {
    this.setState((prevState) => ({
      showEmployeeDetails: !prevState.showEmployeeDetails
    }));
  };

  openEditForm = () => {
    const { employee } = this.props;
    this.setState({ 
      showEditForm: true, 
      editEmployeeDetails: employee
     });
  };


  handleEditFormHide = () => {
    this.setState({ 
      showEditForm: false 
    });
  }

  deleteEmployeeData = () => {
    const { employee } = this.props;
    const employeeDetails = localStorage.getItem('employees');
    if (employeeDetails) {
      const employees: IEmployee[] = JSON.parse(employeeDetails);
      const index = employees.findIndex(emp => emp.firstname === employee.firstname && emp.lastname === employee.lastname);
      if (index !== -1) {
        employees.splice(index, 1); 
        localStorage.setItem('employees', JSON.stringify(employees));
      
        this.setState({ showEmployeeDetails: true},()=>{
          this.props.isDeleted();
        });
      }
    }
  };


  
  render() {
    const {employee} = this.props;
    const { showEmployeeDetails, showEditForm, editEmployeeDetails } = this.state;
    
    return (
      <div className="col-md-4 col-xl-3 specification text-secondary cardalign p-2" onClick={this.toggleEmployeeDetails}>
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

        {showEmployeeDetails && (
          <div className="content">
            <div className="col-xl-12">
              <div className="card-block d-flex">
                <div className="image">
                  <img className="p-3 mt-4" src={profile} alt="Profile" />
                </div>
                <div className="p-3 text-secondary">
                  <div className="employeeLabel">Employee Details</div>
                  <ul>UserName: {employee.firstname} {employee.lastname} </ul>
                  <ul>Email: {employee.email}</ul>
                  <ul>Department: {employee.department}</ul>
                  <ul>Job Title: {employee.jobtitle} </ul>
                  <ul>Phone Number: {employee.phonenumber}</ul>
                  <ul>SkypeID: {employee.skypeid}</ul>
                  <ul>Office:  {employee.officer}</ul>
                  <div className="buttons">
                    <button className="btn btn-primary ms-3 mt-5" onClick={this.openEditForm}>Edit</button>
                    <button className="btn btn-danger ms-3 mt-5" onClick={this.deleteEmployeeData} >Delete</button>
                    <button className="btn btn-secondary ms-3 mt-5">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showEditForm && <EditForm editEmployee={editEmployeeDetails} onHide={this.handleEditFormHide}/>}
      </div>
    );
  }
}
export default EmployeeCard;

