// ContactUs.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  message: yup.string().min(10, 'Message should be at least 10 characters').required('Message is required'),
});

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: '897d04f1-7f18-480c-a57d-ecefaaf77674',
      name: data.name,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post('https://api.web3forms.com/submit', userInfo);
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-8 space-y-8 md:space-y-0 md:space-x-8 w-full max-w-5xl">
        {/* Contact Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                {...register('name')}
                className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Message</label>
              <textarea
                {...register('message')}
                rows="4"
                className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-2xl font-semibold">Contact Information</h3>
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-blue-500" size={24} />
            <span className="text-lg">+92 3350528956</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-red-500" size={24} />
            <span className="text-lg">daniyal123@gmail.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-green-500" size={24} />
            <span className="text-lg">Pakistan,Karachi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
