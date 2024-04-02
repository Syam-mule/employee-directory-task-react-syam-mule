
import IEmployee from '../components/Interface/EmployeeInterface'
  
export function  getData() {
    const employeeDetails: IEmployee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    return employeeDetails;
  }

 export function  setData(employeeDetails: IEmployee[]) {
    localStorage.setItem('employees', JSON.stringify(employeeDetails));
  }



