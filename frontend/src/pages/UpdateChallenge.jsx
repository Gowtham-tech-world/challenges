import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateChallenge, getChallenges } from '../apis/challenges';

const UpdateChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data = await getChallenges();
        const match = data.find((c) => c.id.toString() === id);
        if (match) {
          setChallenge({
            title: match.title,
            description: match.description,
            start_date: match.start_date,
            end_date: match.end_date,
          });
        } else {
          navigate('/'); // fallback if not found
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchChallenge();
  }, [id, navigate]);

  const handleChange = (e) => {
    setChallenge({ ...challenge, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChallenge(id, challenge);
      alert('Challenge updated successfully!');
      navigate('/');
    } catch (err) {
      alert('Failed to update challenge');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border shadow rounded">
      <h2 className="text-xl font-bold mb-4">Update Challenge</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={challenge.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={challenge.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="start_date"
          value={challenge.start_date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="end_date"
          value={challenge.end_date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Update Challenge
        </button>
      </form>
    </div>
  );
};

export default UpdateChallenge;
