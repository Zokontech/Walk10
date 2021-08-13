// import logo from './logo.svg';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Patients from './Screens/Patients'
import PatientForm from './Screens/PatientForm'
import TrialForm from './Screens/TrialForm'
import PatientDashboard from './Screens/PatientDashboard'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
function App () {
  return (
    <>
      <Router>

        <Navbar bg='light' expand='lg'>
          <Container>
            <Navbar.Brand href='/'>Walk10</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/newpatient'>New Patient</Nav.Link>
                <Nav.Link href='/newtrial'>New Trial</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

        <div>
          <Switch>
            <Route exact path='/'>
              <Patients />
            </Route>
            <Route path='/newpatient'>
              <PatientForm />
            </Route>
            <Route path='/newtrial'>
              <TrialForm />
            </Route>
            <Route path='/patients/:patientid'>
              <PatientDashboard />
            </Route>
          </Switch>
        </div>
      </Router>

    </>
  )
}

export default App
