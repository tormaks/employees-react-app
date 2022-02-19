import './app.css';
import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Alex', salary: 800, increase: false, star: false, id: 1},
        {name: 'John', salary: 1200, increase: false, star: false, id: 2},
        {name: 'Max', salary: 3000, increase: false, star: false, id: 3},
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id),
      }
    })
  }

  addItem = (name, salary) => {
    const newUser = {name, salary, increase: false, star: false, id: this.maxId++};
    this.setState(({data}) => {
      return {
        data: [...data, newUser],
      }
    })
  }

  onToggleProp = (id, prop, value) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          if (prop === 'salary') return {...item, [prop]: value};
          else {
            return {...item, [prop]: !item[prop]};
          }
        }
        return item;
      })
    }))
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  searchEmp = (items, term) => {
    if (term.length === 0) return items;
    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    })
  }

  onFilter = (filter) => {
    this.setState({filter});
  }

  filterData = (items, filter) => {
    switch (filter) {
      case 'star':
        return items.filter(item => item.star === true);
      case 'more1000':
        return items.filter(item => item.salary >= 1000);
      default:
        return items;
    }
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = data.length;
    const employeesIncrease = data.filter(obj => obj.increase).length;
    const visibleData = this.filterData(this.searchEmp(data, term), filter);
    return (
        <div className='app'>
          <AppInfo
              employees={employees}
              employeesIncrease={employeesIncrease}/>
          <div className='search-panel'>
            <SearchPanel
                onUpdateSearch={this.onUpdateSearch}/>
            <AppFilter
                filter={filter}
                onFilter={this.onFilter}/>
          </div>
          <EmployeesList
              data={visibleData}
              onDelete={this.deleteItem}
              onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm
              onAdd={this.addItem}/>
        </div>
    );
  }
}

export default App;