
import React, { useEffect, useState } from 'react';
import { getAvatar } from '../api';

const Avatar = ({ text }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await getAvatar(text);
        setAvatarUrl(response.url);  
      } catch (error) {
        console.error("Error fetching avatar", error);
      }
    };
    fetchAvatar();
  }, [text]);

  return (
    <div className="avatar">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" />
      ) : (
        <p>Loading avatar...</p>
      )}
    </div>
  );
};

export default Avatar;
