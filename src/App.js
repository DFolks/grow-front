import React from 'react';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      state: null,
      data: null,
      selectedRep: {},
      error: null
    };
  }
  onSubmit = event => {
    event.preventDefault();
    if (this.state.type && this.state.state) {
      fetch(`http://localhost:3000/${this.state.type}/${this.state.state}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.setState({
            error: null,
            data: data.results
          });
        });
    } else {
      this.setState({
        error: 'Please pick from the dropdown lists before searching.'
      });
    }
  };

  handleChange = e => {
    this.setState({
      type: e.target.value
    });
  };

  handleStateChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  populateData = i => {
    this.setState({
      selectedRep: this.state.data[i]
    });
  };
  render() {
    const states = [
      'AL',
      'AK',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'DC',
      'FL',
      'GA',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY'
    ];
    let stateSelect = states.map((ele, index) => {
      return (
        <option key={index} value={ele}>
          {ele}
        </option>
      );
    });
    let repList;
    let partyList;
    if (this.state.data) {
      repList = this.state.data.map((ele, index) => {
        return (
          <li
            key={index}
            onClick={() => this.populateData(index)}
            className="rep-list"
          >
            {ele.name}
          </li>
        );
      });
      partyList = this.state.data.map((ele, index) => {
        return <li key={index}>{ele.party.charAt(0)}</li>;
      });
    }
    let first;
    let last;
    let district;
    let phone;
    let office;
    let link;
    if (this.state.selectedRep) {
      let name = this.state.selectedRep.name;
      if (name) {
        first = name.split(' ')[0];
        last = name.split(' ')[1];
      }
      district = this.state.selectedRep.district;
      phone = this.state.selectedRep.phone;
      office = this.state.selectedRep.office;
      link = this.state.selectedRep.link;
    }
    let error;
    if (this.state.error) {
      error = <p>{this.state.error}</p>;
    }

    return (
      <div className="app">
        <div className="title">
          <h3>Who's My Representative?</h3>
        </div>
        {error}
        <div className="form-section">
          <form
            className="form"
            onSubmit={e => this.onSubmit(e)}
            id="selectform"
          >
            <select form="selectform" onChange={this.handleChange}>
              <option>Choose Type</option>
              <option value="representatives">Representatives</option>
              <option value="senators">Senators</option>
            </select>
            <select form="selectform" onChange={this.handleStateChange}>
              <option>--</option>
              {stateSelect}
            </select>
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="info">
          <div className="repList">
            <h2>
              List /<span className="info-List"> Representatives </span>
            </h2>

            <section className="results">
              <section>
                <p>Name</p>
                <ul>{repList}</ul>
              </section>
              <section>
                <p>Party</p>
                <ul>{partyList}</ul>
              </section>
            </section>
          </div>
          <div className="repInfo">
            <h2>Info</h2>
            <section>
              <div className="info-box">
                <p>{first}</p>
              </div>
              <div className="info-box">
                <p>{last}</p>
              </div>
              <div className="info-box">
                <p>{district}</p>
              </div>
              <div className="info-box">
                <p>{phone}</p>
              </div>
              <div className="info-box">
                <p>{office}</p>
              </div>
              <div className="info-box">
                <p>{link}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
