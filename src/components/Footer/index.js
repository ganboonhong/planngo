import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
  render() {
    var containerStyle = {
      fontFamily: '"Lato", sans-serif',
      padding: '10px 0',
      borderTop: '1px solid #ddd',
      overflow: 'hidden',
      backgroundColor: '#555',
      color: '#ccc',
      position: 'absolute',
      width: "100%",
      left: 0,
      bottom: 0,
    };

    var footerContentStyle = {
      fontSize: '10px',
      fontWeight: '200',
      margin: 0
    };

    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div style={containerStyle} data-style-footer id="footer">

            <div className="col-sm-12">
              <p style={footerContentStyle}>

                Built by <a href="mailto:ganboonhong@gmail.com">Francis Gan</a> in 2017

              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Footer;