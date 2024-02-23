import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Cart = ({ isOpenFeedbak, setOpenFeedback }) => {
  const [feedback, setFeedback] = useState({
    type: 'like',
    details: '',
    accept: false,
  });

  useEffect(() => {
    console.log('isOpenFeedback: ', isOpenFeedbak);
  }, [isOpenFeedbak]); // Added isOpenFeedbak to the dependency array

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFeedback({
      ...feedback,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch('/api/sendEmail', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(feedback),
    // });

    // if (response.ok) {
    //   // Handle success
    //   console.log('Email sent successfully');
    // } else {
    //   // Handle error
    //   console.error('Failed to send email');
    // }
  };

  return (
    <>
      <Transition appear show={isOpenFeedbak} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setOpenFeedback(false)}>
          <div className="z-50 min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            {/* <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-100 m-auto">We appreciate your feedback</Dialog.Title> */}
            <form onSubmit={handleSubmit} className="m-auto p-6 z-50 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex space-x-4 mb-4 z-50">
                <label className="flex items-center">
                  <input type="radio" name="type" value="like" checked={feedback.type === 'like'} onChange={handleChange} />
                  <span className="ml-2">Like</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="type" value="dislike" checked={feedback.type === 'dislike'} onChange={handleChange} />
                  <span className="ml-2">Dislike</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="type" value="suggest" checked={feedback.type === 'suggest'} onChange={handleChange} />
                  <span className="ml-2">Suggest</span>
                </label>
              </div>
              <label className='font-bold mb-2 block'>Enter Feedback(*Required)</label>
              <textarea required name="details" onChange={handleChange} className="z-40 w-full p-2 mb-4 border rounded" />
              <div className="mb-4 flex items-center">
                <input type="checkbox" name="accept" checked={feedback.accept} onChange={handleChange} />
                <label className="ml-2">
                  I accept the terms and conditions
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Send</button>
                  <button type="button" onClick={() => setOpenFeedback(false)} className="bg-gray-300 text-black rounded px-4 py-2">Close</button>
                </div>
              </form>
            </div>
          </Dialog>
        </Transition>
  
     
      </>
    );
  };
  
  export default Cart;
  