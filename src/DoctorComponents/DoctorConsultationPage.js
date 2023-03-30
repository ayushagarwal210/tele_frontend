import React from 'react'
import Prescription from './Prescription'
import './DoctorConsultationPageStyle.css'
import DoctorNavbar from './DoctorNavbar'
import { useNavigate } from 'react-router-dom'
import DoctorVideoCallPage from './DoctorVideoCallPage'

const DoctorConsultationPage = () => {
    const doctorDetail = localStorage.getItem('doctorDetail')
    const navigate = useNavigate()
    // const handleConsultation = () => {
    //     navigate(`/doctor`)
    // }
    return (
        <>
            <DoctorNavbar />
            <div className='consultaion-page'>
                <div className='left'>
                    <Prescription />
                </div>
                <div className='right'>
                    <DoctorVideoCallPage />
                </div>
                {/* <button onClick={handleConsultation}>End Consultation</button> */}
            </div>
        </>
    )
}

export default DoctorConsultationPage