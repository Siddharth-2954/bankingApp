import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/baseUrl";
import AccountList from "../components/AccountList";

const HomePage = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}`)
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white text-center py-6">
          <h1 className="text-3xl font-bold">Banking Application</h1>
          <p className="mt-2 text-sm">Manage your accounts efficiently and securely</p>
        </header>
        <main className="p-6">
          <AccountList accounts={accounts} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
