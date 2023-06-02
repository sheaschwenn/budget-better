import React from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
  // Fetch finance information from the database and store it in a variable
  const financeData = []; // Replace with actual fetched data

  return (
    <div>
      <Navbar />
      <section className="dashboard-section">
        <h2>Welcome to Your Dashboard</h2>
        <div className="finance-info">
          {/* Display finance information */}
          {financeData.length > 0 ? (
            <div>
              <h3>Your Finance Information</h3>
              <ul>
                {financeData.map((dataItem) => (
                  <li key={dataItem.id}>{/* Render finance data item */}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No finance information available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;