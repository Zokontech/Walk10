import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
function PatientForm (props) {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [bday, setBday] = useState()
  const [street, setStreet] = useState()
  const [street2, setStreet2] = useState()
  const [city, setCity] = useState()
  const [state, setState] = useState()
  const [zip, setZip] = useState()
  const onFormSubmit = e => {
    e.preventDefault()
    const data = {
      name: name,
      phone: phone,
      email: email,
      address: `${street}${street2 !== undefined ? ' ' + street2 : ''} ${city}, ${state} ${zip}`,
      birthday: bday
    }
    fetch('/patients',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    e.target.reset()
    if (props?.afterSubmit !== undefined) {
      props.afterSubmit()
    }
  }

  return (

    <Container fluid='xl'>
      <Form onSubmit={onFormSubmit}>

        <Form.Group className='mb-3' controlId='patientForm.name'>
          <Form.Label>Patient Name</Form.Label>
          <Form.Control required type='text' onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='patientForm.email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='patientForm.phone'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel' onChange={e => setPhone(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='patientForm.phone'>
          <Form.Label>Patient Birthday</Form.Label>
          <Form.Control required type='date' onChange={e => setBday(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='patientForm.street'>
          <Form.Label>Street Address</Form.Label>
          <Form.Control required type='text' onChange={e => setStreet(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='patientForm.street'>
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control type='text' onChange={e => setStreet2(e.target.value)} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='patientForm.city'>
              <Form.Label>City</Form.Label>
              <Form.Control required type='text' onChange={e => setCity(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='patientForm.state'>
              <Form.Label>State</Form.Label>
              <Form.Control required type='text' onChange={e => setState(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='patientForm.state'>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control required type='text' onChange={e => setZip(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant='primary' type='submit'>
          Submit
        </Button>

      </Form>
    </Container>
  )
}
export default PatientForm
