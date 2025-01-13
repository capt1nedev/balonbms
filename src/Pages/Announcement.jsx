import React, { useState, useRef, useEffect } from 'react';
import AnnouncementModal from '../Modal/AnnouncementModal';
import axios from 'axios';
import { format } from 'date-fns';
import DefaultPicture from '../Images/Logo.png';
import Picture from '../Images/About-Picture/bg-Picture.jpg';
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import '../App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Announcement() {
  const [isAnnouncement, setIsAnnouncement] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overflowingAnnouncements, setOverflowingAnnouncements] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const textRefs = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 8;

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Fetch announcements when component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/announcements`);
        const sortedAnnouncements = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAnnouncements(sortedAnnouncements);
        setFilteredAnnouncements(sortedAnnouncements); // Initialize with all announcements
        setIsAnnouncement(sortedAnnouncements.length > 0);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setError("Failed to fetch the Barangay Announcement. Please try again later.");
        setIsAnnouncement(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowingAnnouncements = {};
      textRefs.current.forEach((ref, index) => {
        if (ref) {
          const { scrollHeight, clientHeight } = ref;
          newOverflowingAnnouncements[index] = scrollHeight > clientHeight;
        }
      });
      setOverflowingAnnouncements(newOverflowingAnnouncements);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, [filteredAnnouncements]);

  const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = announcements.filter(announcement =>
      announcement.title.toLowerCase().includes(query) ||
      announcement.description.toLowerCase().includes(query)
    );
    setFilteredAnnouncements(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <p className='font-semibold text-green-700'>Loading...</p>
      </div>
    );
  }

  return (
    <section className=''>
      <div className='relative h-96 w-full bg-cover bg-center' style={{ backgroundImage: `url(${Picture})` }}>
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        <div className="relative flex justify-center items-center h-full z-10 p-4 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-20">ANNOUNCEMENTS</h1>
        </div>
      </div>

      {!isAnnouncement && (
        <div className='h-96 w-full flex justify-center items-center'>
          <h1 className='text-5xl font-semibold text-green-700'>There is no Announcement</h1>
        </div>
      )}

      {isAnnouncement && (
        <div>
          <div className="flex justify-center items-center my-6 w-full px-6">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full max-w-lg">
              <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search announcements..." className="flex-grow px-4 py-2 text-sm outline-none" />

              <button className="px-4 py-2 text-gray-600">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className='flex flex-col flex-wrap justify-center items-center gap-6 p-6 w-full max-w-screen-2xl mx-auto'>
            {currentAnnouncements.map((announcement, index) => (
              <div key={index} className='flex flex-col sm:flex-row md:w-[70%] w-full h-fit bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
                <img src={announcement.imageUrl || DefaultPicture} alt={announcement.title} className='w-full sm:w-52 h-52 sm:h-auto object-fit' />
                <div className='flex flex-col justify-between p-4 flex-1'>
                  <div>
                    <h2 className='text-md font-semibold text-green-700'>{announcement.title}</h2>
                    <p className='text-xs text-gray-400 mb-2'>Posted on: {format(new Date(announcement.createdAt), 'Pp')}</p>
                    <hr />
                  </div>

                  <div ref={el => (textRefs.current[index] = el)} className='text-sm text-gray-500 overflow-hidden line-clamp-3' dangerouslySetInnerHTML={{ __html: announcement.description }} />
                  {overflowingAnnouncements[index] && (
                    <button onClick={() => { setSelectedAnnouncement(announcement); setIsModalOpen(true); }} className='text-sm text-green-700 hover:underline mt-2 self-start'>
                      Read More
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-4 my-6 w-full px-5">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' : 'bg-green-700 text-white hover:bg-green-800 border-green-700'}`}>
            <FaChevronLeft /> Previous
          </button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Page</span>
            <span className="font-semibold text-gray-800">{currentPage}</span>
            <span className="text-gray-500">of</span>
            <span className="font-semibold text-gray-800">{totalPages}</span>
          </div>

          <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' : 'bg-green-700 text-white hover:bg-green-800 border-green-700'}`}>
            Next <FaChevronRight />
          </button>
        </div>
      )}

      <AnnouncementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} announcement={selectedAnnouncement} />
    </section>
  );
}

export default Announcement;
