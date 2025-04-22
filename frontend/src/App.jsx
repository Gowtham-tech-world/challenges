// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { getChallenges } from './apis/challenges'; // Assuming you have this API call
// import { useNavigate } from 'react-router-dom';

// function App() {
//   const [challenges, setChallenges] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is logged in by checking localStorage
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);

//     // Fetch challenges if the user is logged in
//     if (token) {
//       const fetchChallenges = async () => {
//         try {
//           const data = await getChallenges();
//           setChallenges(data);
//         } catch (error) {
//           console.error('Error fetching challenges:', error);
//         }
//       };
//       fetchChallenges();
//     }
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen w-full">
//       <Navbar />
//       <div className="flex-grow p-6 w-full">
//         {isLoggedIn ? (
//           <div>
//             <h1 className="text-2xl font-semibold">Challenges</h1>
//             {challenges.length === 0 ? (
//               <p className="mt-2 text-gray-700">No challenges available.</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                 {challenges.map((challenge) => (
//                   <div key={challenge.id} className="border p-4 rounded-md shadow-md">
//                     <h2 className="text-xl font-semibold">{challenge.title}</h2>
//                     <p>{challenge.description}</p>
//                     <p>
//                       <strong>Start Date: </strong>{challenge.start_date}
//                     </p>
//                     <p>
//                       <strong>End Date: </strong>{challenge.end_date}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             <h1 className="text-2xl font-semibold">Welcome to MyApp!</h1>
//             <p className="mt-2 text-gray-700">Please log in to see your challenges.</p>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getChallenges, deleteChallenge } from './apis/challenges';
import { useNavigate } from 'react-router-dom';

function App() {
  const [challenges, setChallenges] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);
    setUserEmail(user?.email || '');

    if (token) {
      const fetchChallenges = async () => {
        try {
          const data = await getChallenges();
          setChallenges(data);
        } catch (error) {
          console.error('Error fetching challenges:', error);
        }
      };
      fetchChallenges();
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this challenge permanently?');
    if (confirmDelete) {
      try {
        await deleteChallenge(id);
        setChallenges((prev) => prev.filter((c) => c.id !== id));
        alert('Challenge deleted successfully');
      } catch (error) {
        console.error('Error deleting challenge:', error);
        alert('Failed to delete challenge');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex-grow p-6 w-full">
        {isLoggedIn ? (
          <div>
            <h1 className="text-2xl font-semibold">Challenges</h1>
            {challenges.length === 0 ? (
              <p className="mt-2 text-gray-700">No challenges available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="border p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold">{challenge.title}</h2>
                    <p>{challenge.description}</p>
                    <p>
                      <strong>Start Date: </strong>{challenge.start_date}
                    </p>
                    <p>
                      <strong>End Date: </strong>{challenge.end_date}
                    </p>
                    {userEmail === 'admin@gmail.com' && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => navigate(`/update-challenge/${challenge.id}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                        >
                          Update
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          onClick={() => handleDelete(challenge.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold">Welcome to MyApp!</h1>
            <p className="mt-2 text-gray-700">Please log in to see your challenges.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
