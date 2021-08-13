import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Modal, Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { LineChart, XAxis, CartesianGrid, Line, Tooltip } from 'recharts'
import TrialForm from './TrialForm'
import { TrashFill } from 'react-bootstrap-icons'
function PatientForm () {
  const { patientid } = useParams()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [bday, setBday] = useState()
  const [edit, setEdit] = useState(false)
  const [patient, setPatient] = useState([])
  const [trials, setTrials] = useState([])
  const [show, setShow] = useState(false)
  const [changed, setChanged] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const afterSubmit = () => {
    handleClose()
    setChanged(!changed)
  }
  const [toDelete, setToDelete] = useState()
  const [showDelete, setShowDelete] = useState(false)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = (i) => {
    setShowDelete(true)
    setToDelete(i)
  }
  const deletePatient = () => {
    fetch(`/trials/${toDelete}`,
      {
        method: 'delete'
      })
    setShowDelete(false)
    setChanged(!changed)
  }
  useEffect(() => {
    fetch(`/patients/${patientid}`).then(
      res => {  
        return res.json()
      })
      .then(p => {
        setPatient(p);
        setName(p.name);
        setPhone(p.phone);
        setEmail(p.email);
        setAddress(p.address);
        setBday(p.birthday);
      })
    fetch(`/trials/${patientid}`).then(
      res => {
        return res.json()
      })
      .then(p => {
        setTrials(p)
      })
  }, [changed, patientid])

  const submitUpdate = () => {
    const data = {
      id: patientid,
      name: name,
      phone: phone,
      email: email,
      address: address,
      birthday: bday
    }
    fetch(`/patients/${patient?.id}`,
      {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    setChanged(!changed)
    setEdit(false)
  }

  return (
    <Container fluid='xl'>
      <Row>
        <Col>
          {edit
            ? <Form.Group className='mb-3' controlId='patientForm.name'>
              <Form.Control size='lg' required type='text' defaultValue={patient?.name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            : <h1>{patient?.name}</h1>}
        </Col>

        {edit
          ? <>
            <Col className='mb-3' style={{ textAlign: 'right' }}>
              <Button variant='primary' style={{ marginRight: '5px' }} onClick={submitUpdate}>Save</Button>
              <Button variant='secondary' onClick={() => setEdit(false)}>Cancel</Button>
            </Col>
            </>
          : <Col style={{ textAlign: 'right' }}>
            <Button variant='primary' onClick={() => setEdit(true)}>Edit</Button>
            </Col>}
      </Row>
      <Row>
        <Col>
          <LineChart
            width={600}
            height={400}
            data={trials.map(i => ({ 'Trial Time': i.time, 'Normal Speed': i.slowspeed, 'Fast Speed': i.fastspeed, Notes: i.notes }))}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey='name' />
            <Tooltip />
            <CartesianGrid stroke='#f5f5f5' />
            <Line type='monotone' dataKey='Trial Time' stroke='#000000' yAxisId={0} />
            <Line type='monotone' dataKey='Normal Speed' stroke='#006400' yAxisId={1} />
            <Line type='monotone' dataKey='Fast Speed' stroke='#640000' yAxisId={1} />
            <Line type='monotone' dataKey='Notes' stroke='#000000' yAxisId={1} />
          </LineChart>
        </Col>
        <Col>
          <Table>
            <tbody>
              {/* <tr>
                            <th style={{"textAlign":"right"}}>Name</th>
                            <td>{patient?.name}</td>
                        </tr>
                        */}
              <tr>
                <th style={{ textAlign: 'right' }}>Email</th>
                <td>
                  {edit
                    ? <Form.Group className='mb-3' controlId='patientForm.email'>
                      <Form.Control type='email' defaultValue={patient?.email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group> : patient?.email}

                </td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right' }}>Phone</th>
                <td>
                  {edit
                    ? <Form.Group className='mb-3' controlId='patientForm.phone'>
                      <Form.Control type='tel' defaultValue={patient?.phone} onChange={e => setPhone(e.target.value)} />
                    </Form.Group> : patient?.phone}
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right' }}>Address</th>
                <td>
                  {edit
                    ? <Form.Group className='mb-3' controlId='patientForm.address'>
                      <Form.Control type='text' required defaultValue={patient?.address} onChange={e => setAddress(e.target.value)} />
                    </Form.Group> : patient?.address}
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right' }}>Birthday</th>
                <td>
                  {edit
                    ? <Form.Group className='mb-3' controlId='patientForm.bday'>
                      <Form.Control required type='date' defaultValue={patient?.birthday} onChange={e => setBday(e.target.value)} />
                    </Form.Group>
                    : patient?.birthday}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Walk Trials</h2>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button variant='primary' onClick={handleShow}>Add Trial</Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New trial</Modal.Title>
        </Modal.Header>
        <Modal.Body><TrialForm patient={[patient]} afterSubmit={afterSubmit} /></Modal.Body>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant='danger' onClick={deletePatient}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th />
            <th>Time</th>
            <th>Distance</th>
            <th>Assistance Level</th>
            <th>Normal Trial 1</th>
            <th>Normal Trial 2</th>
            <th>Normal Avg. Speed</th>
            <th>Fast Trial 1</th>
            <th>Fast Trial 2</th>
            <th>Fast Avg. Speed</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {trials.map(i =>
            <tr key={i?.id}>
              <td><TrashFill onClick={() => handleShowDelete(i.id)} /></td>
              <td>{i?.time}</td>
              <td>{i?.distance}</td>
              <td>{i?.assistlevel}</td>
              <td>{i?.slow1}</td>
              <td>{i?.slow2}</td>
              <td>{i?.slowspeed}</td>
              <td>{i?.fast1}</td>
              <td>{i?.fast2}</td>
              <td>{i?.fastspeed}</td>
              <td>{i?.notes}</td>
            </tr>)}
        </tbody>
      </Table>
    </Container>
  )
}
export default PatientForm
