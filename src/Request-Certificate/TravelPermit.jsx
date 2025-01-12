import React, { useState, useEffect, useRef } from 'react';
import BarangayClearance from '../Images/Certificate-Picture/Certificate of No Property-1.png'
import '../App.css';
import axios from 'axios';
import SubmitModal from '../Modal/SubmitModal';

import { MdOutlineContentCopy } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TravelPermit() {
  const [owner, setOwner] = useState('')
  const [address, setAddress] = useState('')
  const [typeOfCar, setTypeOfCar] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [scrap, setScrap] = useState('')
  const [driver, setDriver] = useState('')
  const [driverLicense, setDriverLincese] = useState('')
  const [whenToTravel, setWhenToTravel] = useState('')
  const [whereToTravel, setWhereToTravel] = useState('')
  const [email, setEmail] = useState('')
  
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

  const handleOwner = (event) => {
    const value = event.target.value;
    setOwner(value);
  };

  const handleAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handleTypeOfCar = (event) => {
    const value = event.target.value;
    setTypeOfCar(value);
  };

  const handlePlateNumber = (event) => {
    const value = event.target.value;
    setPlateNumber(value);
  };

  const handleScrap = (event) => {
    const value = event.target.value;
    setScrap(value);
  };

  const handleDriver = (event) => {
    const value = event.target.value;
    setDriver(value);
  };

  const handleDriverLicense = (event) => {
    const value = event.target.value;
    setDriverLincese(value);
  };

  const handleWhenToTravel = (event) => {
    const value = event.target.value;
    setWhenToTravel(value);
  };

  const handleWhereToTravel = (event) => {
    const value = event.target.value;
    setWhereToTravel(value);
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const resetForm = () => {
    setOwner('');
    setAddress('')
    setTypeOfCar('')
    setPlateNumber('')
    setScrap('')
    setDriver('')
    setDriverLincese('')
    setWhenToTravel('')
    setWhereToTravel('')
    setEmail('');

    const newTrackingCode = generateTrackingCode();
    setTrackingCode(newTrackingCode);
  };

  const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (owner === '') {
      alert('Please enter pangalan ng may ari');
      return;
    } else if (!isNaN(owner)) {
      alert('Please enter a valid name');
      return;
    } else if (plateNumber === '') {
      alert('Please enter your plate number');
      return;
    } else if (scrap === '') {
      alert('Please enter anong scrap ang ita-travel');
      return;
    } else if (address === '') {
      alert('Please enter your address');
      return;
    } else if (driver === '') {
      alert('Please enter name of your driver');
      return;
    } else if (driverLicense === '') {
      alert('Please enter your driver license');
      return;
    } else if (whenToTravel === '') {
      alert('Please enter kung kailan ita-travel');
      return;
    } else if (whereToTravel === '') {
      alert('Please enter kung saan dadalhin');
      return;
    } else if (email === '') {
      alert('Please enter your email address');
      return;
    } else {
      setIsLoading(true);
    }
  
    const formData = {
      certificateType: 'Travel Permit',
      owner,
      address,
      typeOfCar,
      plateNumber,
      scrap,
      driver,
      driverLicense,
      whenToTravel,
      whereToTravel,
      email,
      trackingCode,
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/travelPermit`, formData);
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
          <p className="text-green-500 bg-gray-100 font-semibold p-3 border">TRAVEL PERMIT</p>

          <div className="flex flex-col gap-3 mt-2">
            {/* <div className="w-full flex flex-col gap-y-1 px-3 py-3">
              <label className="text-green-500 font-semibold">Tracking Code <span className='text-gray-600 font-normal'>(Copy your tracking code)</span></label>

              <div className='relative'>
                {trackingCode && <input type="text" disabled className="p-2 bg-gray-200 w-full" value={trackingCode} />}

                <MdOutlineContentCopy onClick={handleCopyTracking} className='absolute top-3 right-3 text-lg cursor-pointer text-green-500' />
              </div>
            </div> */}

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Pangalan ng May-ari:</label>
              <input type="text" placeholder="Pangalan ng May-ari" className="p-2 border border-black outline-green-500 w-full" value={owner} onChange={handleOwner} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Address:</label>
              <input type="text" placeholder="House No. / Street / Subd Village" className="p-2 border border-black outline-green-500 w-full" value={address} onChange={handleAddress} />
            </div>

            <div className="w-full flex gap-3 px-3">
              <div className="w-full">
                <label htmlFor="" className='text-gray-700 text-sm'>Uri ng Sasakyan:</label>
                <input type="text" placeholder="Uri ng Sasakyan" className="p-2 border border-black outline-green-500 w-full" value={typeOfCar} onChange={handleTypeOfCar} />
              </div>

              <div className="w-full">
                <label htmlFor="" className='text-gray-700 text-sm'>Plate Number:</label>
                <input type="text" placeholder="Plate Number" className="p-2 border border-black outline-green-500 w-full" value={plateNumber} onChange={handlePlateNumber} />
              </div>
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Anong Scrap ang Ita-Travel:</label>
              <input type="text" placeholder="Anong Scrap ang Ita-Travel" className="p-2 border border-black outline-green-500 w-full" value={scrap} onChange={handleScrap} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Pangalan ng Driver:</label>
              <input type="text" placeholder="Pangalan ng Driver" className="p-2 border border-black outline-green-500 w-full" value={driver} onChange={handleDriver} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Driver's License:</label>
              <input type="text" placeholder="Driver's License" className="p-2 border border-black outline-green-500 w-full" value={driverLicense} onChange={handleDriverLicense} />
            </div>

            <div className="w-full flex gap-3 px-3">
              <div className="w-full">
                <label htmlFor="" className='text-gray-700 text-sm'>kailan Ita-Travel:</label>
                <input type="date" className="p-2 border border-black outline-green-500 w-full" value={whenToTravel} onChange={handleWhenToTravel} />
              </div>

              <div className="w-full">
                <label htmlFor="" className='text-gray-700 text-sm'>Saan Dadalhin:</label>
                <input type="text" placeholder="Saan Dadalhin" className="p-2 border border-black outline-green-500 w-full" value={whereToTravel} onChange={handleWhereToTravel} />
              </div>
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Email:</label>
              <input type="email" placeholder="Enter Email Address" className="p-2 border border-black outline-green-500 w-full" value={email} onChange={handleEmail} />
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

export default TravelPermit;
