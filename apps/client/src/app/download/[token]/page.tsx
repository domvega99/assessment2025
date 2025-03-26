'use client';
import { User } from '@/app/interfaces/user.interface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const { token } = useParams(); 
  const [message, setMessage] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 
  const [user, setUser] = useState<User | null>(null);
  const [tokenUserId, setTokenUserId] = useState<string | null>(null); 

  useEffect(() => {
    if (token) {
      const confirmDownload = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/download/confirm/${token}`);
          
          if (!response.ok) {
            if (response.status === 401) {
              const data = await response.json();
              setMessage(data.message || 'Invalid or expired download link.');
            } else {
              setMessage('An error occurred. Please try again.');
            }
          } else {
            const data = await response.json();
            setTokenUserId(data.payload.userId);
            setMessage('Please log in to continue and download the link.');
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('There was an issue connecting to the server.');
        }
      };

      confirmDownload(); 
    }
  }, [token]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    try {
      const response = await fetch('http://localhost:3001/api/data/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setMessage('Login successful! You can now download the file.');
        if (data.id == tokenUserId) {
          triggerDownload();
        } else {
          setMessage('User ID does not match the token, unable to download.');
        }
      } else {
        setMessage(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('There was an issue connecting to the server.');
    }
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/download.pdf'; 
    link.download = 'download.pdf';
    link.click();
  };

  return (
    <div>
      <p className="italic text-red-500">{message || 'Loading confirmation...'}</p>
      {isAuthenticated && !user && (
        <div className="mt-5 w-1/4">
          <h2 className="text-xl font-semibold">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="password" className="block">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
