"use strict";
const
ServerGlobal    = require('../global.js'),
Global          = require('../../src/components/Global'),
Order           = require('../mongo/models/order');

let Result = {success: false, msg: '', msgBsStyle: ''},
Body       = {};

module.exports = (app) => {

    app.get('/receipt/:id', (req, res) => {

        const 
        fs         = require('fs'),
        pdf        = require('html-pdf'),
        jade       = require('jade'),
        orderId    = req.params.id;

        Order.findOne({
            _id: orderId
        }).then((order) => {
            
            const 
            htmlPath   = __dirname + '/../../views/htmls/receipt.html',
            pdfPath    = __dirname + '/../../views/pdfs/receipt.pdf',
            html       = fs.readFileSync( htmlPath, 'utf8'),
            options    = {format: 'A4'},
            htmlString = jade.renderFile(__dirname + '/../../views/receipt.jade', {
                title: order.sequence,
                content: order.sequence,
            });

            fs.unlinkSync(htmlPath);
            fs.writeFileSync( htmlPath, htmlString);

            pdf.create(html, options).toFile(pdfPath, (err, res) => {
                if (err) console.log(err)
            })

            const fileName = 'EO Digital Receipt.pdf';

            res.download(pdfPath, fileName, (err) => {
                // error handler
            });


        })

        // res.render('receipt', {
        //     title: 'Yoyo'
        // })
    })
}