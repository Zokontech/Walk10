import React, { useState, useEffect } from 'react'
import { Modal, Table, Container, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PatientForm from './PatientForm'
import { TrashFill } from 'react-bootstrap-icons'
function Patients () {
  const [state, setState] = useState([])
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
    fetch(`/patients/${toDelete}`,
      {
        method: 'delete'
      })
    setShowDelete(false)
    setChanged(!changed)
  }

  useEffect(() => {
    fetch('/patients').then(
      res => {
        console.log(res)
        return res.json()
      })
      .then(patients => {
        console.log(patients)
        setState(patients)
      })
  }, [changed])

  return (
    <Container fluid='xl'>
      <Row>
        <Col>
          <h1>Patients</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button variant='primary' onClick={handleShow}>Add Patient</Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PatientForm afterSubmit={afterSubmit} />
            </Modal.Body>
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
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {state.map(i =>
            <tr key={i.id}>
              <td><TrashFill onClick={() => handleShowDelete(i.id)} /></td>
              <td><Link to={'/patients/' + i.id}>{i.name}</Link></td>
              <td>{i.phone}</td>
              <td>{i.email}</td>
              <td>{i.address}</td>
              <td>{i.birthday}</td>
            </tr>)}
        </tbody>
      </Table>

    </Container>
  )
}
export default Patients
