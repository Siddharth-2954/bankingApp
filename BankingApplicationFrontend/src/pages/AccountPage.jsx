import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../api/baseUrl";
import AccountDetails from "../components/AccountDetails";

const AccountPage = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setAccount(data))
      .catch((error) => console.error("Error fetching account:", error));
  }, [id]);

  return (
    <div>
      {account ? <AccountDetails account={account} /> : <p>Loading...</p>}
    </div>
  );
};

export default AccountPage;
