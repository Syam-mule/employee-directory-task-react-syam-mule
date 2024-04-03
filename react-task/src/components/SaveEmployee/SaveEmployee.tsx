import IEmployee from "../Interface/EmployeeInterface";
import { getData, setData } from "../../services/services";

const saveEmployeeData = (employee: IEmployee) => {
  const employees = getData();
  employees.push(employee);
  setData(employees);
};

export default saveEmployeeData;
