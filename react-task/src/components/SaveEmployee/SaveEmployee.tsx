
import IEmployee from "../Interface/EmployeeInterface"


const saveEmployeeData = (employee: IEmployee) => {
  const employeeDetails = localStorage.getItem("employees");
  
  let employees: IEmployee[]=[];
  if (employeeDetails) {
    employees = JSON.parse(employeeDetails);
  }
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
};

export default saveEmployeeData;
