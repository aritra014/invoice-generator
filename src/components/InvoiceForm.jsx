import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import Image from 'react-bootstrap/Image';

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("₹");
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToAddress1, setBillToAddress1] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [billToAddress2, setBillToAddress2] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [companyName ,setCompanyName] = useState("");
  const [billFromAddress1, setBillFromAddress1] = useState("");
  const [billFromAddress2, setBillFromAddress2] = useState("");
  const [notes, setNotes] = useState(
    "Thank you for your business. We look forward to serving you again."
  );
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");

  const [items, setItems] = useState([
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      description: "",
      price: "100",
      quantity: 1,
    },
  ]);

  const handleCalculateTotal = useCallback(() => {
    let newSubTotal = items
      .reduce((acc, item) => {
        return acc + parseFloat(item.price) * parseInt(item.quantity);
      }, 0)
      .toFixed(2);

    let newtaxAmount = (newSubTotal * (taxRate / 100)).toFixed(2);
    let newdiscountAmount = (newSubTotal * (discountRate / 100)).toFixed(2);
    let newTotal = (
      newSubTotal -
      newdiscountAmount +
      parseFloat(newtaxAmount)
    ).toFixed(2);

    setSubTotal(newSubTotal);
    setTaxAmount(newtaxAmount);
    setDiscountAmount(newdiscountAmount);
    setTotal(newTotal);
  }, [items, taxRate, discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;

    console.log(id, name, value);

    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Form onSubmit={openModal}>
   
      <Row className="d-flex justify-content-center align-items-center p-2 w-100">
          <div className="d-flex justify-content-center align-items-center p-2 w-100">
      <div  >
   </div>

<div>
      

</div>



    </div>




        <Col md={10} lg={11}>

         <div className="d-flex flex-row justify-content-center align-items-center fs-4  w-100 mb-4 mt-2">
       <div>
        
             <Image
            src="/invoice_icon.png"  
            alt="Logo"
            width={50}
            className="me-1"
          />
          </div>
           <span className="d-flex app-title text-secondary">Invoice Generator</span>
         

         </div>
       
         
         <Row className="d-flex flex-row justify-content-between align-items-center  w-100 mb-3 mt-5">
<Col md={3} ><Button
  variant="primary"
  type="submit"

>
<i class="bi bi-file-earmark-text me-2"></i>
  Generate Invoice
</Button></Col>


<Col md={9} >


<Row className="align-items-center justify-content-end">
  {/* Tax Rate */}
  <Col xs={12} md={4}>
    <Form.Group as={Row}>
      <InputGroup>
        <InputGroup.Text  className="fw-bold fs-6">Tax</InputGroup.Text>
        <Form.Control
          name="taxRate"
          type="number"
          value={taxRate}
          onChange={handleChange(setTaxRate)}
          className="bg-white border w-25"
          placeholder="0.0"
          min="0.00"
          step="0.01"
          max="100.00"
          
        />
        <InputGroup.Text className="bg-light fw-bold text-secondary small">
          %
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  </Col>

  {/* Discount Rate */}
  <Col xs={12} md={4}>
    <Form.Group>
      <InputGroup>
        <InputGroup.Text className="fw-bold">Discount</InputGroup.Text>
        <Form.Control
          name="discountRate"
          type="number"
          value={discountRate}
          onChange={handleChange(setDiscountRate)}
          className="bg-white border w-25"
          placeholder="0.0"
          min="0.00"
          step="0.01"
          max="100.00"
 
        />
        <InputGroup.Text className="bg-light fw-bold text-secondary small">
          %
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  </Col>

  {/* Currency */}
  <Col xs={12} md={4}  >
    <InputGroup>
    
      <Form.Select
        onChange={(e) => setCurrency(e.target.value)}
        className="btn btn-light"
        aria-label="Change Currency"
      >
        <option value="₹">INR (Indian Rupee)</option>
        <option value="$">USD (United States Dollar)</option>
        <option value="£">GBP (British Pound Sterling)</option>
        <option value="¥">JPY (Japanese Yen)</option>
        <option value="$">CAD (Canadian Dollar)</option>
        <option value="$">AUD (Australian Dollar)</option>
        <option value="$">SGD (Singapore Dollar)</option>
        <option value="¥">CNY (Chinese Renminbi)</option>
        <option value="₿">BTC (Bitcoin)</option>
      </Form.Select>
    </InputGroup>
  </Col>
</Row>


</Col>

          </Row> 
          <Card className="p-4 p-xl-5  ">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={handleChange(setDateOfIssue)}
                    style={{ maxWidth: "150px" }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={handleChange(setInvoiceNumber)}
                  min="1"
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                {/* <Form.Label className="fw-bold">Bill from:</Form.Label> */}
                  <Form.Control
                  placeholder="Company Name"
                  rows={3}
                  value={companyName}
                  type="text"
                  name="companyName"
                  className="my-2 fs-5 fw-bold"
                  onChange={handleChange(setCompanyName)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Your Name"
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={handleChange(setBillFrom)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Company Address"
                  value={billFromAddress1}
                  type="text"
                  name="billFromAddress1"
                  className="my-2"
                  onChange={handleChange(setBillFromAddress1)}
                  autoComplete="address"
                  required
                />
                <Form.Control
                  placeholder="City, State, Pincode"
                  value={billFromAddress2}
                  type="text"
                  name="billFromAddress2"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillFromAddress2)}
                  required
                />
                 <Form.Control
                  placeholder="Country"
                  value={fromCountry}
                  type="text"
                  name="fromCountry"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setFromCountry)}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold fs-5 mt-3">Bill To:</Form.Label>
                <Form.Control
                  placeholder="Who is this invoice to?"
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={handleChange(setBillTo)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Billing address"
                  value={billToAddress1}
                  type="text"
                  name="billToAddress1"
                  className="my-2"
                  onChange={handleChange(setBillToAddress1)}
                  autoComplete="address"
                  required
                />
                <Form.Control
                  placeholder="City , State , Pincode"
                  value={billToAddress2}
                  type="text"
                  name="billToAddress2"
                  className="my-2"
                  onChange={handleChange(setBillToAddress2)}
                  required
                />

                <Form.Control
                  placeholder="Country"
                  value={toCountry}
                  type="text"
                  name="toCountry"
                  className="my-2"  
                  onChange={handleChange(setToCountry)}
                  required
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{ fontSize: "1.125rem" }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thank you for your business. We look forward to serving you again."
              name="notes"
              value={notes}
              onChange={handleChange(setNotes)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                companyName,
                dateOfIssue,
                invoiceNumber,
                billTo,
                billToEmail: billToAddress1,
                billToAddress: billToAddress2,
                billFrom,
                billFromAddress1,
                billFromAddress2,
                fromCountry,
                toCountry,
                notes,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              total={total}
            />


            <div className="text-secondary ">Created by Aritra Das</div>
         
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
