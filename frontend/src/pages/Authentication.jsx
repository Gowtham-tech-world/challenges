// // import React, { useState } from 'react';
// // import { validateEmail, validatePassword } from '../utilities/validation';
// // import { registerUser, loginUser } from '../apis/authentication'; // Import the API functions
// // import { useNavigate } from 'react-router-dom';

// // export const PageType = Object.freeze({
// //   LOGIN: 0,
// //   REGISTER: 1,
// // });

// // const Authentication = ({ pageType = PageType.LOGIN }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(''); // For displaying error messages
// //   const [isLoading, setIsLoading] = useState(false); // For loading state

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(''); // Reset error before checking
// //     setIsLoading(true); // Set loading to true while processing

// //     // Validate email and password
// //     if (!validateEmail(email)) {
// //       setError('Please enter a valid email address.');
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (!validatePassword(password)) {
// //       setError('Password must be at least 6 characters long.');
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       let response;
// //       if (pageType === PageType.LOGIN) {
// //         // Call the login API
// //         response = await loginUser({ email, password });
// //         alert('Logged in successfully');
// //       } else {
// //         // Call the register API
// //         response = await registerUser({ email, password });
// //         alert('Registered successfully');
// //       }

// //       console.log(response); // Log the response to check
// //       setIsLoading(false); // Reset loading state

// //     } catch (err) {
// //       console.error("Error:", err);
// //       setError("Failed to process your request. Please try again.");
// //       setIsLoading(false); // Reset loading state
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center h-screen bg-gray-100">
// //       <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
// //         <h1 className="text-2xl font-bold mb-6 text-center">
// //           {pageType === PageType.LOGIN ? 'Login' : 'Register'}
// //         </h1>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //           {error && <p className="text-red-500 text-sm">{error}</p>}
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
// //             disabled={isLoading} // Disable button while loading
// //           >
// //             {isLoading ? 'Processing...' : pageType === PageType.LOGIN ? 'Login' : 'Register'}
// //           </button>
// //         </form>

// //         {pageType === PageType.LOGIN ? (
// //           <p className="text-center mt-4">
// //             New user?{' '}
// //             <a href="/register" className="text-blue-600 hover:underline">
// //               Register
// //             </a>
// //           </p>
// //         ) : (
// //           <p className="text-center mt-4">
// //             Already a user?{' '}
// //             <a href="/login" className="text-blue-600 hover:underline">
// //               Login
// //             </a>
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Authentication;



// import React, { useState } from 'react';
// import { validateEmail, validatePassword } from '../utilities/validation';
// import { registerUser, loginUser } from '../apis/authentication';
// import { useNavigate } from 'react-router-dom';

// export const PageType = Object.freeze({
//   LOGIN: 0,
//   REGISTER: 1,
// });

// const Authentication = ({ pageType = PageType.LOGIN }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.');
//       setIsLoading(false);
//       return;
//     }
//     if (!validatePassword(password)) {
//       setError('Password must be at least 6 characters long.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       let response;

//       if (pageType === PageType.LOGIN) {
//         response = await loginUser({ email, password });
//         localStorage.setItem('token', response.token);
//         alert('Logged in successfully');
//       } else {
//         response = await registerUser({ email, password });
//         alert('Registered successfully');
//       }

//       console.log(response.data);
//       navigate('/'); // redirect to Home page after success
//     } catch (err) {
//       console.error('Auth error:', err.response?.data || err.message);
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           {pageType === PageType.LOGIN ? 'Login' : 'Register'}
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Processing...' : pageType === PageType.LOGIN ? 'Login' : 'Register'}
//           </button>
//         </form>

//         <p className="text-center mt-4">
//           {pageType === PageType.LOGIN ? (
//             <>
//               New user?{' '}
//               <a href="/register" className="text-blue-600 hover:underline">
//                 Register
//               </a>
//             </>
//           ) : (
//             <>
//               Already a user?{' '}
//               <a href="/login" className="text-blue-600 hover:underline">
//                 Login
//               </a>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Authentication;

import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../utilities/validation';
import { registerUser, loginUser } from '../apis/authentication';
import { useNavigate } from 'react-router-dom';

export const PageType = Object.freeze({
  LOGIN: 0,
  REGISTER: 1,
});

const Authentication = ({ pageType = PageType.LOGIN }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      let response;

      if (pageType === PageType.LOGIN) {
        response = await loginUser({ email, password });
        console.log("Login Response:", response);

        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          alert('Logged in successfully');
          navigate('/');
        } else {
          throw new Error('Invalid login response format');
        }
      } else {
        response = await registerUser({ email, password });
        alert('Registered successfully. Please log in.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Auth error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {pageType === PageType.LOGIN ? 'Login' : 'Register'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : pageType === PageType.LOGIN
              ? 'Login'
              : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4">
          {pageType === PageType.LOGIN ? (
            <>
              New user?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </>
          ) : (
            <>
              Already a user?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Authentication;

