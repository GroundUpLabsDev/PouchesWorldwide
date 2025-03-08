'use client';

import { useState, useEffect } from 'react';
import { CircleX, CircleCheck } from 'lucide-react';
import Header from '@/components/AdminUi/Header';
import Banner from '@/components/Banner';
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';
import { format } from "date-fns";

const UserDetails = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // Extract userId from query parameters
  const [userAccount, setUserAccount] = useState(null);
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user data based on userId
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://146.190.245.42:1337/api/users/${userId}`);
        const data = await response.json();
        setUserAccount(data); // Assuming the API response has the user details
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Determine user status
  const getUserStatus = (account) => {
    if (!account) return "Loading...";
    if (account.blocked) return "Rejected";
    if (account.confirmed) return "Approved";
    return "Pending";
  };

  const userStatus = getUserStatus(userAccount);

  const handleReject = async () => {
    if (reason.trim() === '') {
      setErrorMessage('Please provide a reason for rejecting the account.');
      return;
    }
   
    try {
      const response = await fetch(`http://146.190.245.42:1337/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blocked: true,
          confirmed: false,
        }),
      });
  
      if (response.ok) {
        alert('Account rejected successfully!');
        setUserAccount((prev) => ({ ...prev, blocked: true, confirmed: false }));
        REmail();
      } else {
        alert('Failed to reject the account.');
      }
    } catch (error) {
      console.error('Error rejecting account:', error);
      alert('An error occurred while rejecting the account.');
    }
  };
  

  const handleAccept = async () => {
    try {
      const response = await fetch(`http://146.190.245.42:1337/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmed: true }),
      });

      if (response.ok) {
        alert('Account approved successfully!');
        setUserAccount((prev) => ({ ...prev, confirmed: true }));
        sendEmail();
      } else {
        alert('Failed to approve the account.');
      }
    } catch (error) {
      console.error('Error approving account:', error);
      alert('An error occurred while approving the account.');
    }
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userAccount.email,
          subject: 'Account Approval',
          text: `Hello,

Your Account Approved

Thanks!
🚀 Pouches`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to send email.");
    }
  };

  const REmail = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userAccount.email,
          subject: 'Account Rejection',
          text: `Hello ${userAccount.name || 'User'},
  
  Unfortunately, your account has been rejected. 
  
  Reason: ${reason}
  
  If you have any questions, feel free to contact us.
  
  Thanks!
  🚀 Pouches`,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to send email.");
    }
  };


  

  if (!userAccount) {
    return <p>Loading...</p>; // Show loading text while fetching data
  }
  const formattedDate = format(new Date(userAccount.createdAt), "yyyy/MM/dd - hh:mm a");

  return (
    <>
      <Header />
      <Banner />

      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Order Status */}
        <div className="flex items-center justify-between p-2 w-[998px] h-9 mt-12 mb-4">
          <div className="flex items-center">
            <span className={`text-white text-sm font-medium px-3 py-1 rounded-full 
              ${userStatus === "Approved" ? "bg-green-500" : 
                userStatus === "Rejected" ? "bg-red-500" : "bg-yellow-500"}`}>
              {userStatus}
            </span>
            <span className="ml-4 text-lg font-medium">User ID #{userId} Account Activation</span>
          </div>
          <div className="text-lg font-medium">
            {formattedDate}
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg border w-[1010px] h-[407px] mt-8">
          <h2 className="text-lg font-semibold mb-4">Seller Information</h2>

          {/* Customer info */}
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Name</span>
              <span className="text-sm font-semibold text-gray-600">Contact Number</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-normal">{userAccount.username}</span>
              <span className="text-base">{userAccount.mobileNumber}</span>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-600">Email</span>
            <div className="text-base">{userAccount.email}</div>
          </div>

          {/* Address */}
          <div>
            <span className="text-sm font-semibold text-gray-600">Address</span>
            <div className="text-base">
              {userAccount.address}
            </div>
          </div>

          <div className="mt-4">
            <span className="text-sm font-semibold text-gray-600">Seller Type</span>
            <div className="text-base">{userAccount.urole}</div>
          </div>
        </div>

        {/* Conditionally Render "Account Rejected" Section */}
        {userStatus === 'Pending' && (
          <div className="bg-white p-8 rounded w-[1017px]">
            <h1 className="text-2xl font-medium mb-4">Take Action</h1>
            <div className="mb-4">
              <label className="block text-[#282f44] text-lg font-medium mb-2 capitalize">
                Why did you reject this account?{' '}
                <span className="bg-[#fa4032] text-white text-sm py-1 px-2 rounded-full">
                  Only For Rejecting Accounts
                </span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded p-4 text-gray-600"
                rows="5"
                placeholder="Write Your Reason to Reject Account ..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4 ">
              <button
                onClick={handleReject}
                className="bg-[#e70000] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 h-[68px]"
              >
                <span>Reject Account</span>
                <CircleX className="w-5 h-5" />
              </button>
              <button
                onClick={handleAccept}
                className="bg-[#009b7c] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 h-[68px]"
              >
                <span>Accept Account</span>
                <CircleCheck className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default UserDetails;
