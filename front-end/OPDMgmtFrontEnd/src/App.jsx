import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'

import HospitalHomePage from './components/hospital/HospitalHomePage'
import Homepage from './pages/homepage'
import DoctorHomepage from './components/doctor/DoctorsHomepage'
import PatientHomepage from './components/Patient/PatientHomepage'
import OpdHomepage from './pages/OpdHomepage'
import BillingHomepage from './pages/BillingHomepage'
import TreatementHomepage from './components/treatment/TreatementHomepage'
import HospitalDetailsPage from './components/hospital/HospitalDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="hospitals" element={<HospitalHomePage />} />
          <Route path="/hospitals/:id" element={<HospitalDetailsPage />} />
          <Route path='doctors' element={<DoctorHomepage />} />
          <Route path='patients' element={<PatientHomepage />} />
          <Route path='opds' element={<OpdHomepage />} />
          <Route path='billing' element={<BillingHomepage />} />
          <Route path='treatement' element={<TreatementHomepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
