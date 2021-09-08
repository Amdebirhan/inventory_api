const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const nodemailer = require('nodemailer');
const InvoiceController = require('./controller/invoice.controller');
const cleanBody = require("../common/middlewares/cleanbody");

//list all invoices

router.get('/', function(req, res) {
  InvoiceController.list
});

//get a single invoice

router.get('/:id', function(req, res) {
  InvoiceController.singleInvoice
});

router.patch('/change-status/:id', function(req, res) {
  InvoiceController.changeStatus
});

router.get(('/get-customers-invoice/:customerId'), [
  cleanBody,
  // validateToken,
  // privilages.getPrivilages,
  InvoiceController.customersInvoice
]);
module.exports = router;

// //convert the invoice to pdf and send it to client by email
// router.get('/:id/email', function(req, res) {
//   const htmlToPdfPath = '/Users/karl/Sites/draft/foxit-mac/examples/simple_demo/html2pdf_mac64';
//   const outputFolder = __dirname + '/../invoices/';

//   // Get the invoice
//   const invoice = invoices.find(invoice => invoice.id === req.params['id']);
//   if (!invoice) {
//     res.redirect('/invoices?error=1');
//   }

//   // Convert the HTML to PDF
//   exec(
//     `${htmlToPdfPath} -html http://localhost:3000/invoices/${req.params['id']} -o ${outputFolder}${req.params['id']}.pdf`,
//     (err, stdout, stderr) => {
//       if (err || stderr) {
//         console.error(err, stderr);
//         res.redirect('/invoices?error=1');
//       } else {
//         console.log(`PDF generated and saved to ${outputFolder}${req.params['id']}.pdf`);

//         // Construct the message
//         const message = {
//           from: 'accounting@example.com',
//           to: invoice.contact_email,
//           subject: 'Reminder: Your Invoice from Tiller, Inc. is Due',
//           html: `<p>Hey ${invoice.contact_name},</p><p>I just wanted to remind you that your invoice for last month's services is now due. I've attached it here for your convenience.</p><p>Thanks for your business!</p>`,
//           attachments: [
//             {
//               filename: 'invoice.pdf',
//               path: `${outputFolder}${req.params['id']}.pdf`,
//             }
//           ]
//         };

//         // Use mailer to send invoice
//         nodemailer
//           .createTransport({jsonTransport: true})
//           .sendMail(message, function (err, info) {
//             if (err) {
//               res.redirect('/invoices?error=1');
//             } else {
//               console.log(info.message);
//               res.redirect('/invoices?success=1');
//             }
//           });
//       }
//   });

// });

// module.exports = router;




// // GET one Product and Export to PDF
// router.get("/:id/exportToPDF", async (req, res) => {
//   const id = req.params.id;
//   await product.getOneProductExportToPdf(id)
//       .then(data =>
//           // OK
//           res.status(201).json({
//               message: `PDF Created`,
//           })
//       )
//       .catch(err => {
//           if (err.status) {
//               res.status(err.status).json({ message: err.message });
//           } else {
//               res.status(500).json({ message: err.message });
//           }
//       });
// });
