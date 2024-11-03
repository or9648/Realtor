import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Card({ address, type, image, buttonText, onButtonClick, onEdit, onDelete }) {
  return (
    <div className="max-w-xs rounded-md shadow-lg bg-white text-gray-800 overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={image || 'https://via.placeholder.com/301'}
        alt="Card Image"
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-300 transition-opacity duration-200 hover:opacity-80"
      />
      <div className="flex flex-col justify-between p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-wide text-yellow-600">{type || 'Default Title'}</h2>
          <p className="text-gray-600">
            {address || 'Default description for the card. Customize by passing a description prop.'}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={onButtonClick}
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
