import React, { Component } from "react";

class ErrorPage extends Component {
    render() {
        return(
          <div className='content_error'>
              <h2>Такого города не существует! Введите корректное название.</h2>
          </div>
        );
    }
}

export default ErrorPage;