import React, { useState } from "react";

const AccountForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    balance: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.accountHolderName && formData.balance) {
      onSubmit({
        accountHolderName: formData.accountHolderName,
        balance: parseFloat(formData.balance),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Create New Account
      </h2>

      <div className="form-group mb-4">
        <label
          htmlFor="accountHolderName"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Account Holder Name:
        </label>
        <input
          type="text"
          id="accountHolderName"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="form-group mb-4">
        <label
          htmlFor="balance"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Initial Balance:
        </label>
        <input
          type="number"
          id="balance"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white rounded-lg text-sm font-medium transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
};

export default AccountForm;
