import React from "react";
import { Link } from "react-router-dom";

const AccountList = ({ accounts }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Accounts</h2>
      <ul className="divide-y divide-gray-200">
        {accounts.map((account) => (
          <li
            key={account.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">{account.accountHolderName}</p>
              <p className="text-sm text-gray-600">Balance: ₹{account.balance.toFixed(2)}</p>
            </div>
            <Link
              to={`/accounts/${account.id}`}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
