import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getChallenges } from './apis/challenges'; // Assuming you have this API call
import { useNavigate } from 'react-router-dom';

function App() {
  const [challenges, setChallenges] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Fetch challenges if the user is logged in
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

