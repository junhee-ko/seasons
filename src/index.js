import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {lat: null, errorMessage: ''}; // This is the only time we do direct assignment
  // }


  state = {lat: null, errorMessage: ''};          // constructor will be added by by babel

  // data loading
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,        // We called setState !! not "this.state.lat = ...."
        });
      },
      (err) => {
        this.setState({
          errorMessage: err.message
        });
      }
    );
  }

  // refresh data or redo something every time component gets updated
  // componentDidUpdate() {
  // }

  // clean-up
  // componentWillUnmount() {
  // }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat}/>
    }

    return <Spinner message="Please accept location request"/>
  }

  // React says we have to define render !!
  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector("#root"));
