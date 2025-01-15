import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Footer() {
  const [barangayLogo, setBarangayLogo] = useState('');
  const [barangayName, setBarangayName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [facebook, setFacebook] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchBarangayInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/barangay-info`)
        if (response.ok) {
          const data = await response.json();
          setBarangayLogo(data.logoUrl)
          setBarangayName(data.name)
          setContactNumber(data.contactNumber)
          setFacebook(data.facebook)
          setEmail(data.email)
        } else {
          console.log('Failed to fetch barangay info')
        }
      } catch (error) {
        console.error('Error fetching barangay info:', error);
      }
    }
    fetchBarangayInfo();
  }, [])

  return (
    <footer className="bg-green-700">
      <div className="footer max-w-screen-xl mx-auto p-10 text-white grid gap-8 lg:grid-cols-4 sm:grid-cols-1">
        <aside>
          <div className="flex flex-wrap items-center gap-2">
            <img src={barangayLogo} alt="Balon Anito Logo" className="h-24" />
            <div className="text-xl text-white">
              <p>Barangay</p>
              <p>{barangayName}</p>
            </div>
          </div>
          <p className="font-dancing text-xl text-white sm:w-full md:w-3/4">
            Maayos na Serbisyo Publiko, Susi sa Progresibong Balon Anito
          </p>
        </aside>

        <nav className="lg:mx-auto">
          <h6 className="text-xl uppercase font-bold text-green-100">Quick Links</h6>
          <NavLink to={"/"} className="link link-hover">Home</NavLink>
          <NavLink to={"/pages/service"} className="link link-hover">Services</NavLink>
          <NavLink to={"/pages/about"} className="link link-hover">History</NavLink>
          <NavLink to={"/pages/news"} className="link link-hover">Announcements</NavLink>
          <NavLink to={"/pages/accomplishment"} className="link link-hover">Accomplishments</NavLink>
          <NavLink to={"/pages/faq"} className="link link-hover">FAQ's</NavLink>

          {/* <NavLink to={"/pages/track-request"} className="link link-hover">Track Request</NavLink> */}
        </nav>

        <nav className="lg:mx-auto">
          <h6 className="text-xl uppercase font-bold text-green-100">Services</h6>
          <div className="grid gap-2 lg:grid-cols-2 grid-cols-1">
            <div className="flex flex-col gap-2">
              <NavLink to={'/barangay-clearance-form'} className="link link-hover">Barangay Clearance</NavLink>
              <NavLink to={'/business-clearance-form'} className="link link-hover">Business Clearance</NavLink>
              <NavLink to={'/travel-permit-form'} className="link link-hover">Travel Permit</NavLink>
              <NavLink to={'/job-seeker-form'} className="link link-hover">First Time Job Seeker</NavLink>

            </div>
            <div className="flex flex-col gap-2 w-[175px]">
              <NavLink to={'/certificate-of-indigency-form'} className="link link-hover">Certificate of Indigency</NavLink>
              <NavLink to={'/certificate-of-residency-form'} className="link link-hover">Certificate of Residency</NavLink>
              <NavLink to={'/certificate-for-solo-parent-form'} className="link link-hover">Certificate of Solo Parent</NavLink>
              <NavLink to={'/common-law-form'} className="link link-hover">Certificate of Common Law</NavLink>
              <NavLink to={'/guardianship-form'} className="link link-hover">Certificate of Guardianship</NavLink>
            </div>
          </div>
        </nav>

        <nav className="lg:mx-auto">
          <h6 className="text-xl uppercase font-bold text-green-100">Contact Us</h6>
          <li className="flex items-center gap-2">
            <FaPhoneAlt className="text-white text-xl" />
            {contactNumber}
          </li>
          <a href="https://www.facebook.com/profile.php?id=100092042062918" className="flex items-center gap-2 link link-hover">
            <FaFacebookF className="text-white text-xl" />
            {facebook}
          </a>
          <a href="mailto:betterbalonanito@gmail.com" className="flex items-center gap-2 link link-hover">
            <SiGmail className="text-white text-xl" />
            {email}
          </a>
        </nav>
      </div>

      <div className="border-t border-white bg-green-700 p-8 text-center">
        <p className="text-white"><strong>&copy;</strong> {new Date().getFullYear()} <strong className="text-white">Balon Anito.</strong> All rights reserved.</p>
      </div>
    </footer>

  );
}

export default Footer;
