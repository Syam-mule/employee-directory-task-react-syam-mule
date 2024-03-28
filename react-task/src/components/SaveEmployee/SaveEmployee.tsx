
import {getData} from "../../services/services";
import IEmployee from "../Interface/EmployeeInterface"
// interface Employee {
//   firstname: string;
//   lastname: string;
//   email: string;
//   department: string;
//   jobtitle: string;
//   phonenumber: string;
//   skypeid: string;
//   officer: string;
// }

const saveEmployeeData = (employee: IEmployee) => {
  const employeeDetails = localStorage.getItem("employees");
  // getData()
  let employees: IEmployee[]=[];
  if (employeeDetails) {
    employees = JSON.parse(employeeDetails);
  }
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
};

export default saveEmployeeData;
