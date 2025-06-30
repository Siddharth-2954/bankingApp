import React, { useState } from "react";
import AccountForm from "../components/AccountForm";
import { BASE_URL } from "../api/baseUrl";

const CreateAccountPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (formData) => {
    setLoading(true);

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
        return response.json();
      })
      .then((data) => {
        alert(`Account created successfully with ID: ${data.id}`);
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg">
        <AccountForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreateAccountPage;
