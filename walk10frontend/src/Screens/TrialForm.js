import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, FloatingLabel, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
function TrialForm (props) {
  const [patients, setPatients] = useState([])
  useEffect(() => {
    fetch('/patients').then(
      res => {
        return res.json()
      })
      .then(p => {
        setPatients(p)
      })
  }, [])
  const [patient, setPatient] = useState(props.patient)
  const [distance, setDistance] = useState(6)
  const [slow1, setSlow1] = useState()
  const [slow2, setSlow2] = useState()
  const [slow3, setSlow3] = useState()
  const [fast1, setFast1] = useState()
  const [fast2, setFast2] = useState()
  const [fast3, setFast3] = useState()
  const [slowspeed, setSlowspeed] = useState()
  const [fastspeed, setFastspeed] = useState()
  const [assistlevel, setAssistlevel] = useState()
  const [time, setTime] = useState()
  const [notes, setNotes] = useState()

  const onFormSubmit = e => {
    e.preventDefault()
    const data = {
      patientid: patient[0].id,
      distance: distance,
      slow1: slow1,
      slow2: slow2,
      slow3: slow3,
      fast1: fast1,
      fast2: fast2,
      fast3: fast3,
      slowspeed: slowspeed,
      fastspeed: fastspeed,
      assistlevel: assistlevel,
      time: time,
      notes: notes
    }

    fetch('/trials',
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
  useEffect(() => {
    if (distance) {
      setSlowspeed(distance / ((parseFloat(slow1) + parseFloat(slow2) + parseFloat(slow3)) / 3))
      setFastspeed(distance / ((parseFloat(fast1) + parseFloat(fast2) + parseFloat(fast3)) / 3))
    }
  }, [slow1, slow2, fast1, fast2, distance, fast3, slow3])

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      <p>1 = total assistance [patient performs 0%-24% of task]*</p>
      <p>2 = maximum assistance [patient performs 25%-49% of task]</p>
      <p>3 = moderate assistance [patient performs 50%-74% of task]</p>
      <p>4 = minimum assistance [patient performs 75%-99% of task]</p>
      <p>5 = supervision [patient requires stand-by or set-up assistance;no physical contact is provided]</p>
      <p>6 = modified independent [patient requires use of assistive devices or bracing, needs extra time, mild safety issues]</p>
      <p>7 = independent</p>
      <p>*Note: if your patient requires total assistance, a score of 0 should be documented</p>
    </Tooltip>
  )

  return (

    <Container fluid='xl'>
      <Form onSubmit={onFormSubmit}>

        <Form.Group>
          <Form.Label>Select Patient</Form.Label>
          <Typeahead
            required
            id='trialForm.name'
            onChange={setPatient}
            options={patients}
            labelKey={(option) => `${option.name || ''}`}
            placeholder='Select a Patient'
            selected={patient || []}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='trialForm.time'>
          <Form.Label>Time of Walk Test</Form.Label>
          <Form.Control required type='datetime-local' onChange={e => setTime(e.target.value)} />
        </Form.Group>

        <Row>
          <Col>

            <OverlayTrigger
              placement='right'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Form.Group className='mb-3' controlId='trialForm.assist'>

                <Form.Label>Assistance Level</Form.Label>
                <Form.Control required type='number' min='0' max='7' step='1' onChange={e => setAssistlevel(e.target.value)} />
              </Form.Group>
            </OverlayTrigger>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.distance'>
              <Form.Label>Distance</Form.Label>
              <InputGroup>
                <Form.Control required type='number' defaultValue='6' onChange={e => setDistance(e.target.value)} />
                <InputGroup.Text>m</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <strong>Comfortable Walking Speed</strong>

        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.slow1'>
              <Form.Label>Trial 1</Form.Label>
              <InputGroup>
                <Form.Control required type='number' step='any' onChange={e => setSlow1(e.target.value)} />
                <InputGroup.Text>s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.slow2'>
              <Form.Label>Trial 2</Form.Label>
              <InputGroup>
                <Form.Control required type='number' step='any' onChange={e => setSlow2(e.target.value)} />
                <InputGroup.Text>s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.slow3'>
              <Form.Label>Trial 3</Form.Label>
              <InputGroup>
                <Form.Control required type='number' step='any' onChange={e => setSlow3(e.target.value)} />
                <InputGroup.Text>s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.slowspeed'>
              <Form.Label>Avg. Speed</Form.Label>
              <InputGroup>
                <Form.Control readOnly type='number' value={slowspeed || 0} />
                <InputGroup.Text>m/s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <strong>Fast Walking Speed</strong>

        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.fast1'>
              <Form.Label>Trial 1</Form.Label>
              <InputGroup>
                <Form.Control required type='number' step='any' onChange={e => setFast1(e.target.value)} />
                <InputGroup.Text>s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.fast2'>
              <Form.Label>Trial 2</Form.Label>
              <InputGroup>
                <Form.Control required type='number' step='any' onChange={e => setFast2(e.target.value)} />
                <InputGroup.Text>s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.fast3'>
              <Form.Label>Trial 3</Form.Label>
              <InputGroup>
                <Form.Control required type='number' step='any' onChange={e => setFast3(e.target.value)} />
                <InputGroup.Text>s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='trialForm.fastspeed'>
              <Form.Label>Avg. Speed</Form.Label>
              <InputGroup>
                <Form.Control readOnly type='number' value={fastspeed || 0} />
                <InputGroup.Text>m/s</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <FloatingLabel className='mb-3' controlId='floatingTextarea2' label='Notes'>
          <Form.Control
            as='textarea'
            placeholder=''
            style={{ height: '100px' }}
            onChange={e => setNotes(e.target.value)}
          />
        </FloatingLabel>
        <Button variant='primary' type='submit'>
          Submit
        </Button>

      </Form>
    </Container>
  )
}
export default TrialForm
// street line 1/2 city state/province
