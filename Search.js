import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: null,
            peoples: [],
        }
    }


    componentDidMount() {
        this.searchInputText(this.state.query);
    }

    onChange(e) {
        this.setState({ query: e.target.value }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.searchInputText(this.state.query);
                }
            } else {
                this.searchInputText(this.state.query);
            }
        })
    }

    searchInputText(query) {
        const url = "http://dummy.restapiexample.com/api/v1/employees";

        if (query) {
            // if get value ion query so filter the data based on the query.
            fetch(url, {
                method: 'GET'
            }).then(results => {
                return results.json();
            }).then(data => {
              //  data.data.map( (emp) => console.log(emp.employee_name));
                let peoples = data.data.filter(emp => emp.employee_name.includes(query)).map((emp) => {
                    return (
                        <ul key={emp.employee_name}>
                           <li>{emp.employee_name}</li>
                        </ul>
                    )
                });
                this.setState({ peoples: peoples });
                console.log("state", peoples)
            })
        } else {
            fetch(url, {
                method: 'GET'
            }).then(results => {
                return results.json();
            }).then(data => {
                let peoples = data.results.map((people) => {
                    return (
                        <ul key={people.name}>
                            <li>{people.name}</li>
                        </ul>
                    )
                })
                this.setState({ peoples: peoples });
                console.log("state", peoples)
            })
        }
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search for..."
                    onChange={this.onChange.bind(this)}
                />
                {this.state.peoples}
            </form>
        )
    }
}

export default Search;
