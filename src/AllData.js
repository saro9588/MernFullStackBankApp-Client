import React, { useState, useEffect } from 'react';

function AllData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch all accounts from API
    fetch('/accounts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        setData(jsonData); // Set the parsed JSON data directly
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error('Fetch error:', fetchError);
        setError(fetchError);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllData;



