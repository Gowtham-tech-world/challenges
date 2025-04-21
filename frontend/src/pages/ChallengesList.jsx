import React, { useEffect, useState } from 'react';
import { getChallenges, deleteChallenge } from '../apis/challenges'; // Import API service

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getChallenges();
        setChallenges(data);
      } catch (error) {
        setError('Failed to fetch challenges.');
      }
    };

    fetchChallenges();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteChallenge(id);
      setChallenges(challenges.filter(challenge => challenge.id !== id));
    } catch (error) {
      setError('Failed to delete challenge.');
    }
  };

  return (
    <div>
      <h1>Challenges</h1>
      {error && <p>{error}</p>}
      <ul>
        {challenges.map(challenge => (
          <li key={challenge.id}>
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
            <button onClick={() => handleDelete(challenge.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengesList;
