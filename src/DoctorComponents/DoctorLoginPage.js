import React from 'react'
import './DoctorStyle.css'
import DoctorLogin from './DoctorLogin'
import NavbarHome from '../Components/NavbarHome'
import FooterSection from '../FooterSection/FooterSection'

const DoctorLoginPage = () => {
    return (
        // <div className='pt-header-section'>
        //     <div className='img'>
        //          <div className='pt-login-heading'>
        //             Patient Login
        //         </div>
        //     </div>

        // </div>
        <>
            <NavbarHome />
            <div className='header-section'>
                <div className='dr-bg'>
                    <div className='dr-img' />
                    <div className='right-container'>
                        <div className='h'>
                            Doctor Login
                        </div>
                        <div>
                            <DoctorLogin className='login-container' />
                        </div>
                    </div>
                </div>
            <FooterSection/>
            </div>
        </>
    )
}

export default DoctorLoginPage