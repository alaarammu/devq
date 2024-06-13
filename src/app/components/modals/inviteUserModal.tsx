import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

type OptionType = {
  value: string;
  label: string;
};

const animatedComponents = makeAnimated();

const options: OptionType[] = [
  { value: 'Developer', label: 'Developer' },
  { value: 'Senior Developer', label: 'Senior Developer' },
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Frontend Developer', label: 'Frontend Developer' },
  { value: 'Backend Developer', label: 'Backend Developer' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer' },
  { value: 'UI/UX Designer', label: 'UI/UX Designer' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Quality Assurance Engineer', label: 'Quality Assurance Engineer' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Database Administrator', label: 'Database Administrator' },
  { value: 'System Administrator', label: 'System Administrator' },
  { value: 'Network Engineer', label: 'Network Engineer' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'Cybersecurity Analyst', label: 'Cybersecurity Analyst' }
];

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  position: yup.object().shape({
    value: yup.string().required('Position is required'),
    label: yup.string().required('Position is required')
  }).nullable().required('Position is required')
});

const InviteUserModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  const handleClose = () => {
    reset({ email: '', position: null });
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Invite members</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Enter email address"
                  className="border border-gray-300 rounded-[8px] py-2 px-4 w-full"
                  {...field}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Select
                  components={animatedComponents}
                  options={options}
                  placeholder="Select a position"
                  className="mb-4"
                  {...field}
                />
              )}
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position?.value?.message}</p>}
          </div>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-[8px] w-full hover:bg-purple-700" type="submit">
            Send invitation
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteUserModal;
