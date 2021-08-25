




import express from "express";
import ptp from "pdf-to-printer";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

app.post('', express.raw({ type: 'application/pdf' }), async(req, res) => {

    const options = {};
    if (req.query.printer) {
        options.printer = req.query.printer;
    }
    const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);

    fs.writeFileSync(tmpFilePath, req.body, 'binary');
    await ptp.print(tmpFilePath, options);
    fs.unlinkSync(tmpFilePath);

    res.status(204);
    res.send();
});

app.listen(port, () => {
    console.log(`PDF Printing Service listening on port ${port}`)
});


const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const electron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;

let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,                                  // Printer type: 'star' or 'epson'
    interface: 'tcp://xxx.xxx.xxx.xxx',                       // Printer interface
    characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
    removeSpecialCharacters: false,                           // Removes special characters - default: false
    lineCharacter: "=",                                       // Set character for lines - default: "-"
    options:{                                                 // Additional options
      timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
    },
    //driver: require(electron ? 'electron-printer' : 'printer')
  });

  printer.alignCenter();
  printer.println("./assets/olaii-logo-black.png");
  await printer.printImage('./assets/olaii-logo-black.png')

  try {
    let execute = printer.execute();
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }