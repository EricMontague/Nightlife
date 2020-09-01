import React from "react";
import PropTypes from "prop-types";

const AlertContext = React.createContext();

class AlertProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      message: "Showing the first message",
      alertClassName: "danger"
    };
    this.alertRef = React.createRef();
    this.setMessage = this.setMessage.bind(this);
    this.show = this.show.bind(this);
    this.clear = this.clear.bind(this);
  }

  setMessage(message, alertClassName) {
    this.setState({
      message,
      alertClassName
    });
  }

  show() {
    this.setState({
      isVisible: true
    });
    this.clear();
    this.alertRef.current.classList.add("show");
    setTimeout(this.clear, 3000);
  }

  clear() {
    this.alertRef.current.classList.remove("show");
  }

  render() {
    return (
      <AlertContext.Provider
        value={{ show: this.show, setMessage: this.setMessage }}
      >
        <div
          className={"alert " + this.state.alertClassName}
          ref={this.alertRef}
        >
          <p>{this.state.message}</p>
        </div>

        {this.props.children}
      </AlertContext.Provider>
    );
  }
}

AlertProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AlertProvider;
