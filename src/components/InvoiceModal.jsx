import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiCloudDownload, BiFile } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
};

const InvoiceModal = ({
  showModal,
  closeModal,
  info,
  currency,
  total,
  items,
  taxAmount,
  discountAmount,
  subTotal,
}) => {
  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div id="invoiceCapture">
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-50">
            
              <h6 className="fw-bold text-secondary mb-1">
                Invoice Number: {info.invoiceNumber || ""}
              </h6>
            </div>
            <div className="d-flex text-end ms-4 w-50 justify-content-end align-items-center">
              <h6 className="fw-bold me-2">Amount&nbsp;Due:</h6>
              <h6 className="fw-bold text-secondary">
                {" "}
               {total}
              </h6>
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold fs-5">{info.companyName || ""}</div>
                <div>{info.billFrom || ""}</div>
                <div>{info.billFromAddress1 || ""}</div>
                <div>{info.billFromAddress2 || ""}</div>
                 <div>{info.fromCountry || ""}</div>
              </Col>
              <Col md={4} className="mt-1">
                <div className="fw-bold fs-5">Bill To:</div>
                <div>{info.billTo || ""}</div>
                <div>{info.billToAddress || ""}</div>
                <div>{info.billToEmail || ""}</div>
                 <div>{info.toCountry || ""}</div>
              </Col>
              <Col md={4}>
               <div className=" mt-2"><span className="fw-bold me-1"> Invoice Date: </span> {info.dateOfIssue || ""} </div>
                <div className=" mt-2"><span className="fw-bold me-4"> Due Date: </span> {info.dateOfIssue || ""} </div>
             
              </Col>
            </Row>
            <Table className="mb-0">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>ITEM</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  return (
                    <tr id={i} key={i}>
                      <td style={{ width: "70px" }}>{item.quantity}</td>
                      <td>
                        {item.name}  
                      </td>
                      <td>
                        {item.description}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {currency} {item.price}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {currency} {item.price * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    SUBTOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {subTotal}
                  </td>
                </tr>
                {taxAmount != 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      TAX
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {currency} {taxAmount}
                    </td>
                  </tr>
                )}
                {discountAmount != 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      DISCOUNT
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {currency} {discountAmount}
                    </td>
                  </tr>
                )}
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {total}
                  </td>
                </tr>
              </tbody>
            </Table>
            {info.notes && (
              <div className="bg-light py-3 px-4 rounded">{info.notes}</div>
            )}
          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}></Col>
            <Col md={6}>
              <Button
                variant="outline-primary"
                className="d-block w-100 mt-3 mt-md-0"
                onClick={GenerateInvoice}
              >
                <BiFile
                  style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                  className="me-2"
                />
                Save As PDF
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      
    </div>
  );
};

export default InvoiceModal;
