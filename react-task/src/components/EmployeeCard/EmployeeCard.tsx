import React, { Component } from 'react';
import profile from '../../resources/images/profile.jpg';
import EditForm from '../Form/EditForm/EditEmployee';
import IEmployee from '../Interface/EmployeeInterface';
import { getData, setData } from '../../services/services';

interface IEmployeeCardProps {
  employee: IEmployee;
  departmentMap: { [key: string]: number };
  officerMap: { [key: string]: number };
  isDeleted: () => void;
}

interface IEmployeeCardState {
  showEmployeeDetails: boolean;
  showEditForm: boolean;
  editEmployeeDetails: IEmployee | null;
  showConfirmationPopup: boolean;
}

class EmployeeCard extends React.Component<IEmployeeCardProps, IEmployeeCardState> {
  constructor(props: IEmployeeCardProps) {
    super(props);
    this.state = {
      showEmployeeDetails: false,
      showEditForm: false,
      editEmployeeDetails: null,
      showConfirmationPopup: false,
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

  toggleConfirmationPopup = () => {
    this.setState({
        showConfirmationPopup: !this.state.showConfirmationPopup
    });
};

deleteEmployeeData = () => {
  const { employee } = this.props;
   const employeeDetails: IEmployee[] =getData();
  const index = employeeDetails.findIndex(emp => emp.firstname === employee.firstname);
  if (index !== -1) {
    employeeDetails.splice(index, 1); 
    setData(employeeDetails);
    this.setState({ 
      showEmployeeDetails: true,
      showConfirmationPopup: false
    }, () => {
      this.props.isDeleted();
    });
  }
};

  render() {
    const { employee } = this.props;
    const { showEmployeeDetails, showEditForm, editEmployeeDetails, showConfirmationPopup } = this.state;

    return (
      <div className="col-md-4 col-xl-3 specification text-secondary  p-2" onClick={this.toggleEmployeeDetails}>
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
                    <button className="btn btn-danger ms-3 mt-5" onClick={this.toggleConfirmationPopup}>Delete</button>
                    <button className="btn btn-secondary ms-3 mt-5">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showConfirmationPopup && (
          <div className="confirmation-popup">
            <p><b>Are you sure you want to delete this employee?</b></p>
            <button className="btn btn-danger" onClick={this.deleteEmployeeData}>Delete</button>
            <button className="btn btn-secondary" onClick={this.toggleConfirmationPopup}>Cancel</button>
          </div>
        )}

        {showEditForm && <EditForm editEmployee={editEmployeeDetails} onHide={this.handleEditFormHide}/>}
        
      </div>
    );
  }
}
export default EmployeeCard;


