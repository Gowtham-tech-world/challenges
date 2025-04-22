// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createChallenge } from '../apis/challenges'; // Import API service

// const CreateChallenge = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is logged in and is an admin
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (!token || !user || user.email !== 'admin@gmail.com') {
//       navigate('/login'); // Redirect to login if not logged in or not an admin
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     const challengeData = { title, description, start_date: startDate, end_date: endDate };

//     try {
//       await createChallenge(challengeData);
//       setSuccess('Challenge created successfully');
//       setTitle('');
//       setDescription('');
//       setStartDate('');
//       setEndDate('');
//     } catch (error) {
//       setError('Failed to create challenge');
//     }
//   };

//   return (
//     <div>
//       <h1>Create Challenge</h1>
//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           placeholder="Start Date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           placeholder="End Date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           required
//         />
//         <button type="submit">Create Challenge</button>
//       </form>
//     </div>
//   );
// };

// export default CreateChallenge;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChallenge } from '../apis/challenges'; // Import API service

const CreateChallenge = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and is an admin
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user || user.email !== 'admin@gmail.com') {
      navigate('/login'); // Redirect to login if not logged in or not an admin
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const challengeData = { title, description, start_date: startDate, end_date: endDate };

    try {
      await createChallenge(challengeData);
      setSuccess('Challenge created successfully');
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      setError('Failed to create challenge');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create Challenge</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create Challenge
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CreateChallenge;
