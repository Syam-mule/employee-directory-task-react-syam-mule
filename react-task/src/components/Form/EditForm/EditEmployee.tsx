import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../RegistrationForm/RegistrationForm.css'
import './EditEmployee.css';
import  IEmployee  from '../../Interface/EmployeeInterface';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { getData, setData } from '../../../services/services';
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



  handleEdit = (editedEmployee: IEmployee) => {
    if (editedEmployee) {
      const employeeDetails: IEmployee[] = getData();
      const index = employeeDetails.findIndex(emp => emp.firstname === editedEmployee.firstname);
      if (index !== -1) {
        employeeDetails[index] = editedEmployee;
        console.log("Updating the details for index: " + index);
         setData(employeeDetails)
        // localStorage.setItem("employees", JSON.stringify(employeeDetails));
        this.props.onHide();
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
