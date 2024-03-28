import React, { Component, ChangeEvent, FormEvent } from "react";
import "./RegistrationForm.css";
import saveEmployeeData from "../../SaveEmployee/SaveEmployee";
import  IEmployee  from '../../Interface/EmployeeInterface';

interface IRegistrationFormState {
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  jobtitle: string;
  phonenumber: string;
  skypeid: string;
  officer: string;
  userRegistrationForm: boolean;
  
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    phoneNumber: string;
    department:string;
    skypeId: string;
    officer: string;
  };
}

class RegistrationForm extends React.Component<{}, IRegistrationFormState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      department: "",
      jobtitle: "",
      phonenumber: "",
      skypeid: "",
      officer: "",
      userRegistrationForm: true,
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        phoneNumber: '',
        skypeId: '',
        department:'',
        officer: ''
        
      },
    };
  }

  handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstname: e.target.value });
  };

  handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ lastname: e.target.value });
  };

  handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ department: e.target.value });
  };

  selectJobTitle = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ jobtitle: e.target.value });
  };

  handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ phonenumber: e.target.value });
  };

  handleSkypeIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ skypeid: e.target.value });
  };

  selectOfficer = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ officer: e.target.value });
  };

  validateForm = () => {
    let isValid = true;
    const errors: any = {};

    if (this.state.firstname.trim() === '' || !/^[a-zA-Z\s-]{3,20}$/.test(this.state.firstname)) {
      errors.firstName = 'First name must be between 3 and 20 characters and contain only letters, spaces, or hyphens';
      isValid = false;
    }
    
    
    if (this.state.lastname.trim() === '' || !/^[a-zA-Z\s-]{3,20}$/.test(this.state.lastname)) {
      errors.lastName = 'Last name must be between 3 and 20 characters and contain only letters, spaces, or hyphens';
      isValid = false;
    }

    if (this.state.email.trim() === '' || !/^([a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/.test(this.state.email)) {
      errors.email = 'Enter the Email Properly abc@gmail.com';
      isValid = false;
    }

     if (this.state.jobtitle.trim() === '' || !/^/.test(this.state.jobtitle)) {
      errors.jobTitle = 'Select the Job Title.';
      isValid = false;
    }

     if (this.state.department.trim() === '' || !/^/.test(this.state.department)) {
      errors.department = 'Select the department Properly.';
      isValid = false;
    }

     if (this.state.phonenumber.trim() === '' || !/^[6-9]\d{9}$/.test(this.state.phonenumber)) {
      errors.phoneNumber = 'Enter the Phonenumber Like{9023456791}';
      isValid = false;
    }

     if (this.state.skypeid.trim() === '' || !/^[a-zA-Z0-9]/.test(this.state.skypeid)) {
      errors.skypeId = 'Enter the skypeID Properly.. ';
      isValid = false;
    }

    if (this.state.officer.trim() === '' || !/^/.test(this.state.officer)) {
      errors.officer = 'Select the officer Properly.. ';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {  
    const { firstname, lastname, email, department, jobtitle, phonenumber, skypeid, officer } = this.state;

    const employee: IEmployee = {
      firstname,
      lastname,
      email,
      department,
      jobtitle,
      phonenumber,
      skypeid,
      officer,
      
    };

    saveEmployeeData(employee);
    this.setState(prevState => ({
      userRegistrationForm: false,
    }));
  }
  };
  
  resetForm = () => {
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      department: "",
      jobtitle: "",
      phonenumber: "",
      skypeid: "",
      officer: "",
    });
  };

  handleCloseForm = () => {
    this.setState({ 
      userRegistrationForm: false
     });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      department,
      jobtitle,
      phonenumber,
      skypeid,
      officer,
      userRegistrationForm,
    } = this.state;
    const { errors } = this.state;

    return (
      <div  className="usersignin">
        {userRegistrationForm && (
         <form  className="usersignin"
            onSubmit={this.handleSubmit}
            onReset={this.resetForm}>

            <label className="fs-4 fw-bold">ADD EMPLOYEE</label>
            <div className="row">
              <div className="mb-2 col-md-5">
                <span className="close" title="Close Modal" onClick={this.handleCloseForm}>
                  <i className="fa fa-close closepopup"></i>
                </span>
                <label>
                  <b>
                    First Name<span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-control"
                  value={firstname}
                  onChange={this.handleFirstNameChange}
                  placeholder="Enter your first name"
                  required />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className="mb-2 col-md-5">
                <label>
                  <b>
                    Last Name<span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                  value={lastname}
                  onChange={this.handleLastNameChange}
                  placeholder="Enter your last name"
                  required />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>

              <div className="mb-2 col-md-10">
                <label>
                  <b>
                    Email<span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={this.handleEmailChange}
                  placeholder="Enter your email"
                  required />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="mb-2 col-md-5">
                <label>
                  <b>
                    Department<span className="text-danger">*</span>
                  </b>
                </label>
                <select
                  className="form-select"
                  name="department"
                  id="department"
                  onChange={this.selectChange}
                  value={department} required>
                  <option value="">Select Department</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="ITAdministration">IT Administration</option>
                  <option value="HumanResource">Human Resource</option>
                </select>
                {errors.department && <span className="error">{errors.department}</span>}
              </div>
              <div className="mb-2 col-md-5">
                <label>
                  <b>
                    Job Title<span className="text-danger">*</span>
                  </b>
                </label>
                <select
                  className="form-select"
                  name="jobtitle"
                  id="jobtitle"
                  onChange={this.selectJobTitle}
                  value={jobtitle}
                  required
                >
                  <option value="">Select Job Title</option>
                  <option value="WebDeveloper">Web Developer</option>
                  <option value="SoftwareEngineer">Software Engineer</option>
                  <option value="ReactDeveloper">React Developer</option>
                  <option value="FullStack">Full Stack Developer</option>
                  <option value="DataBaseDeveloper">Database Developer</option>
                </select>
                {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
              </div>
              <div className="mb-2 col-md-10">
                <label>
                  <b>
                    Phone Number<span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  className="form-control"
                  value={phonenumber}
                  onChange={this.handlePhoneNumberChange}
                  maxLength={10}
                  placeholder="Enter your phone number"
                  required />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
              </div>
              <div className="mb-2 col-md-10">
                <label>
                  <b>
                    Skype ID<span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="text"
                  name="skypeid"
                  id="skypeid"
                  className="form-control"
                  value={skypeid}
                  onChange={this.handleSkypeIdChange}
                  placeholder="Enter your Skype ID"
                  required />
                {errors.skypeId && <span className="error">{errors.skypeId}</span>}
              </div>
              <div className="mb-2 col-md-10">
                <label>
                  <b>
                    Office<span className="text-danger">*</span>
                  </b>
                </label>
                <select
                  className="form-select"
                  name="office"
                  id="office"
                  onChange={this.selectOfficer}
                  value={officer}
                  required>
                  <option value="">Select Office location</option>
                  <option value="DurghamCheruvu">Durgham Cheruvu</option>
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Madhapur">Madhapur</option>
                  <option value="HitechCity">Hitech City</option>
                </select>
                {errors.officer && <span className="error">{errors.officer}</span>}
              </div>
              <div className="mb-2 mt-4 col-md-3">
                <button
                  className="btn reset btn-danger"
                  type="reset">
                  Reset
                </button>
              </div>

              <div className="mb-2 mt-3 col-md-3">
                <button
                  className="btn btn-success formate"
                  id="submitform"
                  name="submitform"
                  value="submit"
                  type="submit">
                  Add
                </button>
              </div>

            </div>
          </form>
        
        )}
      </div>
    );
  }
}

export default RegistrationForm;
