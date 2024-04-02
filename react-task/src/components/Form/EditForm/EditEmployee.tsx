import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../RegistrationForm/RegistrationForm.css'
import './EditEmployee.css';
import  IEmployee  from '../../Interface/EmployeeInterface';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { getData } from '../../../services/services';
interface IEditFormProps {
  editEmployee: IEmployee | null;
  onHide: () => void;
}

interface IEditFormState {
  editedEmployee: IEmployee | null;
}

class EditForm extends Component<IEditFormProps, IEditFormState> {
  constructor(props: IEditFormProps) {
    super(props);
    this.state = {
      editedEmployee: {...(props.editEmployee as IEmployee) }
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      editedEmployee: {
        ...(prevState.editedEmployee as IEmployee),
        [name]: value,
      },
    }));
  };

  // handleEdit = (index: number,data: any) => {
  //   const editedEmployee = data;
  //   if (editedEmployee) {
  //     const employeeDetails = localStorage.getItem('employees');
  //     if (employeeDetails) {
  //       const employee: IEmployee[] = JSON.parse(employeeDetails);
  //        const index = employee.findIndex(employee => employee.firstname === editedEmployee.firstname);
  //       if (index !== 1) {
  //         employee[index] = editedEmployee;
  //         console.log("Updating the details for index: " + index);
  //         localStorage.setItem("employees", JSON.stringify(employee));
  //         this.props.onHide();
        
  //       }
  //     }
  //   }
  // };

  handleEdit = (index: number, data: any) => {
    const editedEmployee = data;
    if (editedEmployee) {
       const employeeDetails = localStorage.getItem('employees');
     
      if (employeeDetails) {
        const employees: IEmployee[] = JSON.parse(employeeDetails);
        if (index >= 0 && index < employees.length) {
          employees[index] = editedEmployee;
          console.log("Updating the details for index: " + index);
          localStorage.setItem("employees", JSON.stringify(employees));
          this.props.onHide();
        }
      }
    }
  };
  
  render() {
    const { editedEmployee } = this.state;
    return (
      <>
      <RegistrationForm editdata={editedEmployee} handleUpdateBtnClick ={this.handleEdit}/>
      </>
    )
  }
}

export default EditForm;
