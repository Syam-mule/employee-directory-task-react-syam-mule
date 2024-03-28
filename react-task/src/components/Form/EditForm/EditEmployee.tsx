import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../RegistrationForm/RegistrationForm.css'
import './EditEmployee.css';
import  IEmployee  from '../../Interface/EmployeeInterface';


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

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { editedEmployee } = this.state;
    if (editedEmployee) {
      const employeeDetails = localStorage.getItem('employees');
      if (employeeDetails) {
        const employee: IEmployee[] = JSON.parse(employeeDetails);
        const index = employee.findIndex(employee => employee.firstname === editedEmployee.firstname && employee.lastname === editedEmployee.lastname);
        if (index !== 1) {
          employee[index] = editedEmployee;
          console.log("Updating the details for index: " + index);
          localStorage.setItem("employees", JSON.stringify(employee));
          this.props.onHide();
        }
      }
    }
  };

  render() {
    const { editedEmployee } = this.state;
    if (!editedEmployee) {
      return false;
    }

    return (
      <div className='usersignin'>
        <h2>Edit Employee Details</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='col-lg-12 d-flex'>
            <div className='col-lg-5'>
              <label><b>First Name:</b></label>
              <input type="text" id="firstname" name="firstname" className='form-control' value={editedEmployee.firstname} onChange={this.handleInputChange} />
            </div>
            <div className='col-lg-5'>
              <label><b>Last Name:</b></label>
              <input type="text" id="lastname" name="lastname" className='form-control' value={editedEmployee.lastname} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className='col-lg-10'>
            <label><b>Email:</b></label>
            <input type="email" id="email" name="email" className='form-control' value={editedEmployee.email} onChange={this.handleInputChange} />
          </div>
          <div className='col-lg-10'>
            <label><b>Department:</b></label>
            <select
              className="form-select" value={editedEmployee.department} onChange={this.handleInputChange}
              name="department"
              id="department" required>
              <option value="">Select Department</option>
              <option value="Development">Development</option>
              <option value="Testing">Testing</option>
              <option value="ITAdministration">IT Administration</option>
              <option value="HumanResource">Human Resource</option>
            </select>
          </div>
          <div className='col-lg-10'>
            <label><b>Job Title:</b></label>
            <select
              className="form-select" value={editedEmployee.jobtitle} onChange={this.handleInputChange}
              name="jobtitle"
              id="jobtitle"
              required>
              <option value="">Select Job Title</option>
              <option value="WebDeveloper">Web Developer</option>
              <option value="SoftwareEngineer">Software Engineer</option>
              <option value="ReactDeveloper">React Developer</option>
              <option value="FullStack">Full Stack Developer</option>
              <option value="DataBaseDeveloper">Database Developer</option>
            </select>
          </div>
          <div className='col-lg-10'>
            <label><b>Phone Number:</b></label>
            <input type="text" id="phonenumber" name="phonenumber" className='form-control' value={editedEmployee.phonenumber} onChange={this.handleInputChange}/>
          </div>
          <div className='col-lg-10'>
            <label><b>Skype ID:</b></label>
            <input type="text" id="skypeid" name="skypeid" className='form-control' value={editedEmployee.skypeid} onChange={this.handleInputChange}/>
          </div>
          <div className='col-lg-10'>
            <label><b>Office:</b></label>
            <select
              className="form-select" value={editedEmployee.officer} onChange={this.handleInputChange}
              name="office"
              id="office"
              required>
              <option value="">Select Office location</option>
              <option value="DurghamCheruvu">Durgham Cheruvu</option>
              <option value="Gachibowli">Gachibowli</option>
              <option value="Madhapur">Madhapur</option>
              <option value="HitechCity">Hitech City</option>
            </select>
          </div>
       
          <div className='buttons d-flex col-lg-10'>
            <div className="mb-2 mt-3 col-md-3 mt-5">
              <button className="btn btn-primary updatebtn" id="update" value="submit">Update</button>
            </div>
            <div className="mb-2 mt-3 col-md-3 mt-5">
              <button className="btn btn-danger reset" type='reset'>Reset</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditForm;
