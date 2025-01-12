import React, { useState, useEffect, useRef } from 'react';
import BarangayClearance from '../Images/Certificate-Picture/soloParent-1.png'
import '../App.css';
import axios from 'axios';
import SubmitModal from '../Modal/SubmitModal';

import { MdOutlineContentCopy } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CertificateForSoloParent() {
  const [parent, setParent] = useState('')
  const [address, setAddress] = useState('')
  const [child, setChild] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('');

  const [trackingCode, setTrackingCode] = useState('');
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCopyTrackingModal, setShowCopyTrackingModal] = useState(false);
  const [timer, setTimer] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const progressBarRef = useRef(null);

  const handleImageClick = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  useEffect(() => {
    const fetchTrackingCode = () => {
      const generatedCode = generateTrackingCode();
      setTrackingCode(generatedCode);
    };

    fetchTrackingCode();
  }, []);

  useEffect(() => {
    if (showCopyTrackingModal || showSubmitModal) {
      progressBarRef.current.style.animation = `shrink ${timer}s linear forwards`;

      setTimeout(() => {
        setShowCopyTrackingModal(false);
        setShowSubmitModal(false);
      }, timer * 1000);
    }
  }, [showCopyTrackingModal, showSubmitModal, timer]);

  const generateTrackingCode = () => {
    const chars = '0123456789';
    let code = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        code += '-';
      }
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingCode).then(() => {
      setShowCopyTrackingModal(true);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleParient = (event) => {
    const value = event.target.value;
    setParent(value);
  };

  const handleAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handleChild = (event) => {
    const value = event.target.value;
    setChild(value);
  };

  const handleDateOfBirth = (event) => {
    setDateOfBirth(event.target.value); 
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const resetForm = () => {
    setParent('')
    setAddress('')
    setChild('')
    setDateOfBirth('')
    setEmail('')

    const newTrackingCode = generateTrackingCode();
    setTrackingCode(newTrackingCode);
  };

  const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (parent === '') {
      alert('Please enter name of parent');
      return;
    } else if (!isNaN(parent)) {
      alert('Please enter a valid name');
      return;
    } else if (hasSpecialCharacters.test(parent)) {
      alert('Please enter a name without special characters');
      return;
    } else if (address === '') {
      alert('Please enter your address');
      return;
    } else if (child === '') {
      alert('Please enter name of your child');
      return;
    } else if (dateOfBirth === '') {
      alert('Please enter date of birth of your child');
      return;
    } else {
      setIsLoading(true);
    }
  
    const formData = {
      certificateType: 'Certificate For Solo Parent',
      dateRequest: new Date().toISOString(),
      parent,
      address,
      child,
      dateOfBirth,
      email,
      trackingCode,
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/soloParent`, formData);
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('There was an error submitting the form.');
    } finally {
      setIsLoading(false);
      resetForm();
      setShowSubmitModal(true);
    }
  };
  

  return (
    <section className='mt-24 mb-10'>
      <div className='h-fit flex justify-center flex-wrap gap-10'>
        <div className='w-96 h-fit mt-5 p-5 shadow-lg '>
          <div className='w-full h-96 bg-white '>
            <img src={BarangayClearance} alt="Barangay Clearance" onClick={handleImageClick} className='cursor-pointer w-full h-full object-fit' />
          </div>

          <p className='text-sm flex justify-end font-semibold text-gray-500 italic'>Within the day process</p>

          <div className='my-3 text-gray-600'>
            <p>Magdala po ng valid ID, kapag kukunin na ang certificate sa Barangay, bilang patunay ng inyong pagkakakilanlan.</p>
          </div>

          {isImageEnlarged && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10 z-50" onClick={handleImageClick}>
              <img src={BarangayClearance} alt="Barangay Clearance" className="w-auto h-auto max-h-full max-w-full " />
            </div>
          )}
        </div>

        <form className="w-full md:w-1/2 h-fit pb-5 bg-white mt-5 rounded" onSubmit={handleSubmit}>
          <p className="text-green-500 bg-gray-100 font-semibold p-3 border">CERTIFICATE FOR SOLO PARENT</p>

          <div className="flex flex-col gap-3 mt-2">
            {/* <div className="w-full flex flex-col gap-y-1 px-3 py-3">
              <label className="text-green-500 font-semibold">Tracking Code <span className='text-gray-600 font-normal'>(Copy your tracking code)</span></label>

              <div className='relative'>
                {trackingCode && <input type="text" disabled className="p-2 bg-gray-200 w-full" value={trackingCode} />}

                <MdOutlineContentCopy onClick={handleCopyTracking} className='absolute top-3 right-3 text-lg cursor-pointer text-green-500' />
              </div>
            </div> */}

            <div className="w-full flex flex-col px-3">
              <label htmlFor="name-of-parent" className='text-gray-700 text-sm'>Name of Parent:</label>
              <input type="text" id='name-of-parent' placeholder="Enter Name of Parent" className="p-2 border border-black outline-green-500 w-full" value={parent} onChange={handleParient} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="Address" className='text-gray-700 text-sm'>Address:</label>
              <input type="text" id='Address' placeholder="House No. / Street / Subd Village" className="p-2 border border-black outline-green-500 w-full" value={address} onChange={handleAddress} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="name-of-child" className='text-gray-700 text-sm'>Name of Child:</label>
              <input type="text" id='name-of-child' placeholder="Enter Name of Child" className="p-2 border border-black outline-green-500 w-full" value={child} onChange={handleChild} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="date-of-birth" className='text-gray-700 text-sm'>Date of Birth:</label>
              <input type="date" id='date-of-birth' className="p-2 border border-black outline-green-500 w-full" value={dateOfBirth} onChange={handleDateOfBirth} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="email" className='text-gray-700 text-sm'>Email:</label>
              <input type="email" id='email' placeholder="Enter Email Address" className="p-2 border border-black outline-green-500 w-full" value={email} onChange={handleEmail} />
            </div>

            <div className="px-3 w-full">
              <button className={`bg-green-500 text-white w-full p-1 font-semibold hover:bg-green-400 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                {isLoading ? 'Submitting' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {showCopyTrackingModal && (
        <div className="fixed right-5 top-5 flex items-center justify-center z-50">
          <div className="bg-green-100 p-5 rounded shadow-lg w-80">
            <p className="text-center text-gray-600 mb-4">Tracking Code copied successfully!</p>
            <div ref={progressBarRef} className="h-1 bg-green-500"></div>
          </div>
        </div>
      )}

      {showSubmitModal && (
        <SubmitModal progressBarRef={progressBarRef}/>
      )}
    </section>
  );
}

export default CertificateForSoloParent;
