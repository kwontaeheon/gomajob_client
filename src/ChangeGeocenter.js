import React from "react";
import Select from "react-select";
import { withSearch } from "@elastic/react-search-ui";

const options = [
  { value: "40.7128, -74.0060", label: "New York" },
  { value: "41.8781, -87.6298", label: "Chicago" },
  { value: "39.7392, -104.9903", label: "Denver" },
  { value: "37.7749, -122.4194", label: "San Francisco" }
];

class ChangeGeocenter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    selectedOption: { value: "37.7749, -122.4194", label: "San Francisco" }
  };
  handleChange(selectedOption) {
    const { setSearchTerm, resultSearchTerm } = this.props;
    this.setState({ geocenter: selectedOption }, () => {
      setSearchTerm(resultSearchTerm);
    });
    this.props.onGeocenterChange(selectedOption);
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="sui-facet">
        <legend className="sui-facet__title">City Center</legend>
        <Select
          className="sui-select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}

export default withSearch(
  ({ ChangeGeocenter, setSearchTerm, resultSearchTerm }) => ({
    setSearchTerm,
    resultSearchTerm,
    ChangeGeocenter
  })
)(ChangeGeocenter);
