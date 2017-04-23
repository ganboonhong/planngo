import React from 'react';
import { Tooltip } from 'react-bootstrap';

module.exports = {
    // production: true,
    production: false,
    tz: 'Asia/Taipei',
    localDomain: 'http://127.0.0.1:9000',
    commonHint: 'Please check this field.',
    toolTip: (str) => {
        return  <Tooltip id="tooltip"><strong>{str}</strong></Tooltip>;
    },
}