import React, { useState } from 'react';
import { FiPaperclip, FiSend } from 'react-icons/fi';

const Chat = ({ chat, handleAttachFile, handleSendMessage }) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        console.log(message);
        handleSendMessage(message);
        setMessage("");
    };

    return (
        <div className="flex flex-col h-70 md:h-90 justify-between border border-gray-200 p-3">
            <div className="overflow-auto mb-4">
                {chat.map((message, index) => (
                    <div key={index} className={`flex items-start mb-2 ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-full px-3 py-1 ${message.sender === 'You' ? 'bg-green text-white' : 'bg-gray-200 text-black'}`}>
                            <p className='text-xs'><strong>{message.sender}:</strong> {message.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center border rounded-md px-2 py-1">
                <input type="file" id="fileInput" style={{display: 'none'}} onChange={handleAttachFile} accept="image/*" />
                <button className="mr-2" onClick={() => document.getElementById('fileInput').click()}>
                    <FiPaperclip />
                </button>
                <input 
                    className="flex-grow text-sm focus-visible:outline-none" 
                    type='text' 
                    placeholder='Feel free to ask what you want to know' 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                />
                <button className="ml-2 bg-green rounded-md p-2" 
                    onClick={sendMessage} 
                    disabled={!message.trim()}
                >
                    <FiSend color="white" />
                </button>
            </div>
        </div>
    );
};

export default Chat;