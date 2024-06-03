import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const InviteUserModal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Invite members</h2>
        <input
          type="text"
          placeholder="Enter email address"
          className="border border-gray-300 rounded-[8px] py-2 px-4 w-full mb-4"
        />
        <button className="bg-purple-600 text-white py-2 px-4 rounded-[8px] w-full hover:bg-purple-700">
          Send invitation
        </button>
      </div>
    </div>
  );
};

export default InviteUserModal;
