import React, { Component } from 'react';
import '../../EmployeeCard/EmployeeCard.css';
import './SearchFilter.css';
import  IEmployee  from '../../Interface/EmployeeInterface';


interface IElementState {
  searchTerm: string;
  searchElement: keyof IEmployee |'all';
}

interface Props {
  employees: IEmployee[];
}

class Searchfilter extends Component<Props, IElementState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchElement: 'all',
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const savedSearchElement = localStorage.getItem('searchElement') as keyof IEmployee || 'all';
    if (savedSearchTerm && savedSearchElement) {
      this.setState({
        searchTerm: savedSearchTerm,
        searchElement: savedSearchElement,
      });
    }
  }

  handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
  };

  handleSearchElementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const searchElement = event.target.value as keyof IEmployee | 'all';
    this.setState({ searchElement, searchTerm: '' }, () => {
      localStorage.setItem('searchElement', searchElement);
      localStorage.removeItem('searchTerm');
    });
  };

  handleClear = () => {
    this.setState({ searchTerm: '', searchElement: 'all' });
    localStorage.removeItem('searchTerm');
    localStorage.setItem('searchElement', 'all');
  };

  render() {
    const { searchTerm, searchElement } = this.state;
    const { employees } = this.props;

    if (!employees) {
      return <div>No employees data provided!</div>;
    }

    const filteredEmployees = employees.filter(employee => {
      if (searchElement === 'all') {
        return Object.values(employee).join('').toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return (employee[searchElement as keyof IEmployee] as string).toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    return (
      <div className="employeecard">
        <nav className="navbar navbar-expand-lg">
          <span className="search">Search</span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <form className="d-flex">
                  <input
                    className="form-control formlabel me-4"
                    id="searchInput"
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={this.handleSearchTermChange}
                  />
                  <button className="border-0 clearbtn me-3" type="button" onClick={this.handleClear}>
                    Clear
                  </button>
                </form>
              </li>
              <li className="nav-item me-5 mt-1">
                <label className="me-3">Filter By</label>
                <select
                  id="searchElement"
                  className="dropdown"
                  value={searchElement}
                  onChange={this.handleSearchElementChange}>
                  <option value="all">select options</option>
                  <option value="firstname">First Name</option>
                  <option value="jobtitle">Job Title</option>
                  <option value="department">Department</option>
                </select>
              </li>
            </ul>
          </div>
        </nav>

        {/* <div className="specification carddetails  p-2 mt-2 d-flex border">
          {filteredEmployees.map(employee => (
           
              <div className="card me-3">
                <div className="card-block d-flex">
                  <div className="image">
                    <img className="employeeImg p-2" src={profile} alt="Employee" />
                  </div>
                  <div className="employeeDetails mt-1 p-1">
                    <section>
                      {employee.firstname} {employee.lastname}
                    </section>
                    <section>{employee.jobtitle}</section>
                    <section className="employeeDept">{employee.department}</section>
                    <button className="icon">
                      <i className="fa fa-phone"></i>
                    </button>
                    <i className="fa fa-envelope emails p-1"></i>
                    <i className="fa fa-comment emails p-1"></i>
                    <i className="fa fa-star emails p-1"></i>
                    <i className="fa fa-heart emails p-1"></i>
                  </div>
                </div>
              </div>
          
          ))}
        </div> */}
      </div>
    );
  }
}

export default Searchfilter;

