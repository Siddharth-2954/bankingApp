import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../api/baseUrl";

const AccountDetails = ({ account: initialAccount }) => {
  const [account, setAccount] = useState(initialAccount); // Local state for the account

  const handleDeposit = async () => {
    const amount = prompt("Enter deposit amount:");

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const url = `${BASE_URL}/${account.id}/deposit`;
    const requestBody = { amount: parseFloat(amount) };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Deposit failed: ${errorText}`);
        return;
      }

      const updatedAccount = await response.json();
      setAccount(updatedAccount); // Update the state with the new balance
      toast.success(`Successfully deposited ₹${amount}. New balance: ₹${updatedAccount.balance.toFixed(2)}`);
    } catch (error) {
      toast.error("Network error. Please check your connection.");
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    const amount = prompt("Enter withdrawal amount:");

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const url = `${BASE_URL}/${account.id}/withdraw`;
    const requestBody = { amount: parseFloat(amount) };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 400 && errorText.includes("Insufficient balance")) {
          toast.error("Insufficient balance.");
        } else {
          toast.error(`Withdrawal failed: ${errorText}`);
        }
        return;
      }

      const updatedAccount = await response.json();
      setAccount(updatedAccount); // Update the state with the new balance
      toast.success(`Successfully withdrew ₹${amount}. New balance: ₹${updatedAccount.balance.toFixed(2)}`);
    } catch (error) {
      toast.error("Network error. Please check your connection.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Account Details</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Name:</span> {account.accountHolderName}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">Balance:</span> ₹{account.balance.toFixed(2)}
      </p>
      <button
        onClick={handleDeposit}
        className="mr-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Deposit
      </button>
      <button
        onClick={handleWithdraw}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Withdraw
      </button>
    </div>
  );
};

export default AccountDetails;
