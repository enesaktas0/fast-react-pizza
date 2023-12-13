import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../ui/Button';
import { createUser } from './userSlice';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmmit = (e) => {
    e.preventDefault();
    if (!username) return;
    dispatch(createUser(username));
    setUsername('');
    navigate('/menu');
  };

  return (
    <div>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>
      <form onSubmit={handleSubmmit}>
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input mb-8 w-72"
        />
        {username && (
          <div>
            <Button type="primary" disabled={false}>
              Start Ordering
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
