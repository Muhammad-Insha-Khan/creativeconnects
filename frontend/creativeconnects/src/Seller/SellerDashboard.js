// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function SellerDashboard() {
// const [user, setUser] = useState(null);
// const { slug } = useParams();
// useEffect(() => {
//   // Retrieve user data from localStorage
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   if (storedUser) {
//     setUser(storedUser);
//   } else {
//     // Redirect to login if no user is found
//     window.location.href = '/';
//   }
// }, []);

// if (!user) {
//   return <p>Loading...</p>;
// }


//   return (
//     <div>
//     <h2>Welcome to your Dashboard, {user.firstName } , {user.email}!</h2>
//     <p>Email: {user.email}</p>
//     <p>Phone: {user.phone}</p>
//     <p>Field Domain: {user.fieldDomain}</p>
//     <p>Skill: {user.skills}</p>
//     <p>Your unique slug: {slug}</p>
//     {/* Add more user info as needed */}
//   </div>
//   )
// }

// export default SellerDashboard