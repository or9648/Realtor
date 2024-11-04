import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Card({ id, address, price, br,uid, wr, type, image, buttonText, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the caterot page with the dynamic ID
    navigate(`/category/${id}`);
  };

  return (
    <div className="max-w-xs h-[450px] rounded-md shadow-lg bg-white text-gray-800 overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src={image || 'https://via.placeholder.com/301'}
          alt="Card Image"
          className="object-cover object-center w-full rounded-t-md h-[250px] bg-gray-300 transition-opacity duration-200 hover:opacity-80"
        />
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
          A month ago!!!
        </div>
      </div>
      
      <div className="flex flex-col justify-between p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-wide text-yellow-600">{type || 'Default Title'}</h2>
          <p className="text-gray-600 flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-yellow-500" />
            {address || 'Default description for the card. Customize by passing a description prop.'}
          </p>
          <div className="flex items-center justify-between text-gray-700 text-sm">
            <span className="font-semibold">Price: {price}</span>
            <span className="font-semibold">BR: {br}</span>
            <span className="font-semibold">WR: {wr}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 transform hover:scale-105"
          >
            {buttonText || 'Read more'}
          </button>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onEdit}
              className="p-2 text-yellow-600 hover:text-yellow-400 transition duration-200 transform hover:scale-110"
              title="Edit"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-400 transition duration-200 transform hover:scale-110"
              title="Delete"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
