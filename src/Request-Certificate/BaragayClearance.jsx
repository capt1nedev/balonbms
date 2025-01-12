import React, { useState, useEffect, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import the Font Awesome spinner icon
import BrgyClearance from '../Images/Certificate-Picture/barangayClearance-1.png'
import '../App.css';
import axios from 'axios';

import { MdOutlineContentCopy } from "react-icons/md";
import SubmitModal from '../Modal/SubmitModal';
import SettlementModal from '../Modal/SettlementModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BarangayClearance() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [birthday, setBirthday] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [civilStatus, setCivilStatus] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');

  const [trackingCode, setTrackingCode] = useState('');
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
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

  const handleFullName = (event) => {
    const value = event.target.value;
    setFullName(value);
  };

  const handleAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handleGender = (event) => {
    const value = event.target.value;
    setGender(value);
  };

  const handleAge = (event) => {
    const value = event.target.value;
    setAge(value);
  };

  const handleBirthday = (event) => {
    const value = event.target.value;
    setBirthday(value);
  };

  const handleBirthPlace = (event) => {
    const value = event.target.value;
    setBirthPlace(value);
  };

  const handleCivilStatus = (event) => {
    const value = event.target.value;
    setCivilStatus(value);
  };

  const handleBloodType = (event) => {
    const value = event.target.value;
    setBloodType(value);
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePurpose = (event) => {
    const value = event.target.value;
    setPurpose(value);
  };

  const resetForm = () => {
    setFullName('');
    setAddress('')
    setGender('')
    setAge('')
    setBirthday('')
    setBirthPlace('')
    setCivilStatus('')
    setBloodType('')
    setEmail('');
    setPurpose('');

    const newTrackingCode = generateTrackingCode();
    setTrackingCode(newTrackingCode);
  };

  const closeSettlementModal = () => {
    setShowSettlementModal(false);
  };


  const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields first
    if (fullName === '') {
      alert('Please enter your name');
      return;
    } else if (!isNaN(fullName)) {
      alert('Please enter a valid name');
      return;
    } else if (address === '') {
      alert('Please enter your address');
      return;
    } else if (gender === '') {
      alert('Please enter your gender');
      return;
    } else if (age === '') {
      alert('Please enter your age');
      return;
    } else if (birthday === '') {
      alert('Please enter your birthday');
      return;
    } else if (birthPlace === '') {
      alert('Please enter your birth place');
      return;
    } else if (civilStatus === '') {
      alert('Please enter your civil status');
      return;
    } else if (bloodType === '') {
      alert('Please enter your blood type');
      return;
    } else if (purpose === '') {
      alert('Please enter your purpose');
      return;
    }

    try {
      // Check if user is blocklisted before proceeding
      const checkResponse = await axios.get(`${API_BASE_URL}/api/checkBlocklist`, {
        params: {
          fullName: fullName,
          birthday: birthday
        }
      });

      if (checkResponse.data.isBlocked) {
        // alert('Sorry, you are not allowed to submit this form as you are in the blocklist. Please contact the barangay office for more information.');
        setShowSettlementModal(true);
        return;
      }

      // If not blocklisted, proceed with form submission
      setIsLoading(true);

      const formData = {
        certificateType: 'Barangay Clearance',
        fullName,
        address,
        gender,
        age,
        birthday,
        birthPlace,
        civilStatus,
        bloodType,
        email,
        purpose,
        trackingCode,
      };

      const response = await axios.post(`${API_BASE_URL}/api/barangayClearance`, formData);
      console.log(response.data);
      resetForm();
      setShowSubmitModal(true);

    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data || 'There was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='mt-24 mb-10'>
      <div className='h-fit flex justify-center flex-wrap gap-10'>
        <div className='w-96 h-fit mt-5 p-5 shadow-lg '>
          <div className='w-full h-96 bg-white '>
            <img src={BrgyClearance} alt="Barangay Clearance" onClick={handleImageClick} className='cursor-pointer w-full h-full object-fit' />
          </div>

          <p className='text-sm flex justify-end font-semibold text-gray-500 italic'>Within the day process</p>

          <div className='my-3 text-gray-600'>
            <p>Magdala po ng valid ID, kapag kukunin na ang certificate sa Barangay, bilang patunay ng inyong pagkakakilanlan.</p>
          </div>

          {isImageEnlarged && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10 z-50" onClick={handleImageClick}>
              <img src={BrgyClearance} alt="Barangay Clearance" className="w-auto h-auto max-h-full max-w-full " />
            </div>
          )}
        </div>

        <form className="w-full md:w-1/2 h-fit pb-5 bg-white mt-5 rounded" onSubmit={handleSubmit}>
          <p className="text-green-500 bg-gray-100 font-semibold p-3 border">BARANGAY CLEARANCE</p>

          <div className="flex flex-col gap-2 mt-2">
            {/* <div className="w-full flex flex-col gap-y-1 px-3 py-3">
              <label className="text-green-500 font-semibold">Tracking Code <span className='text-gray-600 font-normal'>(Copy your tracking code)</span></label>

              <div className='relative'>
                {trackingCode && <input type="text" disabled className="p-2 bg-gray-200 w-full" value={trackingCode} />}

                <MdOutlineContentCopy onClick={handleCopyTracking} className='absolute top-3 right-3 text-lg cursor-pointer text-green-500' />
              </div>
            </div> */}

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Name:</label>
              <input type="text" placeholder="Enter Full Name" className="p-2 border border-black outline-green-500 w-full" value={fullName} onChange={handleFullName} />
            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Address:</label>
              <input type="text" placeholder="House No. / Street / Subd Village" className="p-2 border border-black outline-green-500 w-full" value={address} onChange={handleAddress} />
            </div>

            <div className="w-full flex gap-3 px-3">
              <div className='w-full'>
                <label htmlFor="" className='text-gray-700 text-sm'>Gender:</label>
                <select name="" id="" className="p-2 border border-black outline-green-500 w-full" value={gender} onChange={handleGender}>
                  <option value="" disabled>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="w-full ">
                <label htmlFor="" className='text-gray-700 text-sm'>Age:</label>
                <input type="text" placeholder="Enter Age" className="p-2 border border-black outline-green-500 w-full" value={age} onChange={handleAge} />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row md:gap-3 gap-2 px-3">
              <div className='w-full'>
                <label htmlFor="" className='text-gray-700 text-sm'>Birthday:</label>
                <input type="date" className="p-2 border border-black outline-green-500 w-full" value={birthday} onChange={handleBirthday} />
              </div>

              <div className="w-full">
                <label htmlFor="" className='text-gray-700 text-sm'>Birth Place:</label>
                <input type="text" placeholder="Ex. Balanga, Bataan" className="p-2 border border-black outline-green-500 w-full" value={birthPlace} onChange={handleBirthPlace} />
              </div>
            </div>

            <div className='w-full flex gap-3 px-3'>
              <div className="w-full">
                <label htmlFor="civilStatus" className='text-gray-700 text-sm'>Civil Status:</label>
                <select name="" id="civilStatus" className="p-2 border border-black outline-green-500 w-full" value={civilStatus} onChange={handleCivilStatus}>
                  <option value="" disabled>Civil Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Seperated">Seperated</option>
                  <option value="Annulled">Annulled</option>
                </select>
              </div>

              <div className="w-full">
                <label htmlFor="bloodType" className="text-gray-700 text-sm">Blood Type:</label>
                <select id="bloodType" className="p-2 border border-black outline-green-500 w-full" value={bloodType} onChange={handleBloodType}>
                  <option value="" disabled>Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

            </div>

            <div className="w-full flex flex-col px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Email:</label>
              <input type="email" placeholder="Enter Email Address" className="p-2 border border-black outline-green-500 w-full" value={email} onChange={handleEmail} />
            </div>

            <div className="w-full flex flex-col gap-y-1 px-3">
              <label htmlFor="" className='text-gray-700 text-sm'>Purpose:</label>
              <textarea name="" id="" rows={6} placeholder="Please state the purpose on what purpose you need the certificate." className="noResize border border-black p-2 outline-green-500 w-full" style={{ resize: 'none' }} value={purpose} onChange={handlePurpose}></textarea>
            </div>

            <div className="px-3 w-full">
              <button className={`bg-green-500 text-white w-full p-1 font-semibold hover:bg-green-400 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                {isLoading ? 'Submitting' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* {showCopyTrackingModal && (
        <div className="fixed right-5 top-5 flex items-center justify-center z-50">
          <div className="bg-green-100 p-5 rounded shadow-lg w-80">
            <p className="text-center text-gray-600 mb-4">Tracking Code copied successfully!</p>
            <div ref={progressBarRef} className="h-1 bg-green-500"></div>
          </div>
        </div>
      )} */}

      {showSubmitModal && (
        <SubmitModal progressBarRef={progressBarRef} />
      )}
      {showSettlementModal && (
        <SettlementModal
          close={closeSettlementModal}
        />
      )}
    </section>
  );
}

export default BarangayClearance;
