import React from "react";

const ThemeContext = React.createContext("light");

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  }

  render() {
    return (
      <ThemeContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
