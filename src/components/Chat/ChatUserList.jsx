import React, { useState, useEffect } from 'react';

const ChatUserList = ({ users, onUserSelect }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [uniqueUsers, setUniqueUsers] = useState([]);

    useEffect(() => {
        if (users.length > 0) {
            const unique = users.reduce((unique, user) => {
                return unique.some(u => u.id === user.id) ? unique : [...unique, user];
            }, []);

            setUniqueUsers(unique);
            setSelectedUser(unique[0].id);
            onUserSelect(unique[0].id);
        }
    }, [users]);

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
        onUserSelect(userId);
    };

    return (
        <div>
            {uniqueUsers.map((user, index) => (
                <div
                    key={index}
                    className={`flex items-center mb-2 p-2 cursor-pointer rounded-md ${user.id === selectedUser ? 'bg-light-green' : ''}`}
                    onClick={() => handleUserClick(user.id)}
                >
                    <div className='relative'>
                        <img className='rounded-full h-12 w-12' src={user.profilePic} alt={user.name} />
                        {user.hasOwnProperty('active') && 
                            <span
                                className={`absolute bottom-0 right-0 inline-block h-3 w-3 rounded-full border-2 border-white ${user.active ? 'bg-green-light' : 'bg-yellow-500'}`}
                            />
                        }
                    </div>
                    <div className='ml-2'>
                        <p>{user.name}</p>
                        {user.hasOwnProperty('active') && 
                            <p className='text-xs text-gray-500'>{user.active ? 'active' : 'away'}</p>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatUserList;