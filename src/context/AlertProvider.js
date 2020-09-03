import React from "react";
import PropTypes from "prop-types";

export const AlertContext = React.createContext();

class AlertProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Showing the first message",
      alertClassName: "danger"
    };
    this.alertRef = React.createRef();
    this.setMessage = this.setMessage.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  setMessage(message, alertClassName) {
    this.setState({
      message,
      alertClassName
    });
  }

  show() {
    this.close();
    this.alertRef.current.classList.add("show");
    setTimeout(this.close, 3000);
  }

  close() {
    this.alertRef.current.classList.remove("show");
  }

  render() {
    return (
      <AlertContext.Provider
        value={{ show: this.show, setMessage: this.setMessage }}
      >
        <div className="alert" ref={this.alertRef}>
          <div className={"alert-content " + this.state.alertClassName}>
            <p>{this.state.message}</p>
            <button className="close-btn" onClick={this.close}>
              &times;
            </button>
          </div>
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
