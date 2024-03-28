import React, { Component,ChangeEvent } from 'react';
import RegistrationForm from '../components/Form/RegistrationForm/RegistrationForm';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department:string;
  phoneNumber: string;
  skypeId: string;
  officer:string
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department:string,
    phoneNumber: string;
    skypeId: string;
    officer:string
  };
}

class FormValidations extends Component<{}, FormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      phoneNumber: '',
      department:'',
      skypeId: '',
      officer:'',
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        department:'',
        phoneNumber: '',
        skypeId: '',
        officer:''
      },
    };
  }

  validateForm = () => {
    let isValid = true;
    const errors: any = {};

    if (this.state.firstName.trim() === '' || !/^[a-zA-Z\s-]{3,20}$/.test(this.state.firstName)) {
      errors.firstName = 'First name must be between 3 and 20 characters and contain only letters, spaces, or hyphens';
      isValid = false;
    }


    else if (this.state.lastName.trim() === '' || !/^[a-zA-Z\s-]{3,20}$/.test(this.state.lastName)) {
        errors.lastName = 'Last name must be between 3 and 20 characters and contain only letters, spaces, or hyphens';
        isValid = false;
      }
  
      else if (this.state.email.trim() === '' || !/^[a-zA-Z\s-]{3,20}$/.test(this.state.lastName)) {
        errors.email = 'Enter the Email Properly abc@gmail.com';
        isValid = false;
      }
  
      else if (this.state.jobTitle.trim() === '' || !/^([a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/.test(this.state.jobTitle)) {
        errors.jobTitle = 'Select the Job Title.';
        isValid = false;
      }

      else if (this.state.department.trim() === '' || !/^/.test(this.state.jobTitle)) {
        errors.department = 'Select the department Properly.';
        isValid = false;
      }

      else if (this.state.phoneNumber.trim() === '' || !/^[6-9]{0-9}/.test(this.state.phoneNumber)) {
        errors.phoneNumber = 'Enter the Phonenumber Like{9023456791}';
        isValid = false;
      }

      else if (this.state.skypeId.trim() === '' || !/^[a-zA-Z0-9]/.test(this.state.skypeId)) {
        errors.skypeId = 'Enter the skypeID Properly.. ';
        isValid = false;
      }

      else if (this.state.officer.trim() === '' || !/^[a-zA-Z0-9]/.test(this.state.officer)) {
        errors.officer = 'Select the officer Properly.. ';
        isValid = false;
      }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.validateForm()) {
      console.log('Form is valid, submitting...');
    } else {
      console.log('Form is invalid');
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <RegistrationForm/>
    );
  }
}

export default FormValidations;
