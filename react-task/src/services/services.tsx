
import SaveEmployee from '../components/RightsideContainer/EmployeeDetailsCard/Rightsidecontainer'
import IEmployee from '../components/Interface/EmployeeInterface'
// interface IEmployee {
//     userid:string;
//     firstname: string;
//     lastname: string;
//     email: string;
//     department: string;
//     jobtitle: string;
//     phonenumber: string;
//     skypeid: string;
//     officer: string;
//   }

  
export function  getData() {
    const employeeDetails: IEmployee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    return employeeDetails;
  }

 export function  setData(employeeDetails: IEmployee[]) {
    localStorage.setItem('employees', JSON.stringify(employeeDetails));
  }



