import React, { Component } from 'react';
import '../../EmployeeCard/EmployeeCard.css';
import './SearchFilter.css';
import  IEmployee  from '../../Interface/EmployeeInterface';


interface IElementState {
  searchTerm: string;
  searchElement: keyof IEmployee;
}

interface Props {
  filteringCards:(searchingText:string,seachingElement:keyof IEmployee)=>void;
}

class Searchfilter extends Component<Props, IElementState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchElement:'firstname',
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const savedSearchElement = localStorage.getItem('searchElement') as keyof IEmployee || 'firstname';
    if (savedSearchTerm && savedSearchElement) {
      this.setState({searchTerm: savedSearchTerm,searchElement: savedSearchElement,
      });
    }
  }

  handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm:event.target.value },()=>{
      this.props.filteringCards(this.state.searchTerm,this.state.searchElement);
    });
  };

  handleSearchElementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ searchElement:event.target.value as keyof IEmployee}, () => {
      this.props.filteringCards(this.state.searchTerm,this.state.searchElement);
    });
  };

  handleClear = () => {
    this.setState({ searchTerm: '', searchElement: "firstname"},()=>{
      this.props.filteringCards(this.state.searchTerm,this.state.searchElement);
    });
  };

  render() {
    const { searchTerm, searchElement } = this.state;
    
    return (
      <div className="employeefilter">
        <nav className="navbar navbar-expand-lg">
          <span className="search me-2" >Search</span>
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
                  <button className="border-0 clearbtn me-4" type="button" onClick={this.handleClear}>
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
                  {/* <option value="">select options</option> */}
                  <option value="firstname">First Name</option>
                  <option value="jobtitle">Job Title</option>
                  <option value="department">Department</option>
                </select>
              </li>
            </ul>
          </div>
        </nav>

        </div> 
    
    );
  }
}

export default Searchfilter;

