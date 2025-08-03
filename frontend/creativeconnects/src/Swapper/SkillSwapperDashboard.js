// import React, {useEffect , useState} from 'react'
// import { useParams } from 'react-router-dom';




// export default function SkillSwapperDashboard() {
//     const [user, setUser] = useState(null);
//     const { slug } = useParams();

//   useEffect(() => {
//     // Retrieve user data from localStorage
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       // Redirect to login if no user is found
//       window.location.href = '/';
//     }
//   }, []);

//   if (!user) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <div>SkillSwapperDashboard

//     <h2>Welcome to your Dashboard, {user.firstName}!</h2>
//     <p>Email: {user.email}</p>
//     <p>Phone: {user.phone}</p>
//     <p>Field Domain: {user.expertiseHave}</p>
//     <p>Interests: {user.expertiseLookingFor}</p>
//     <p>Your unique slug: {slug}</p>
//     </div>
//   )
// }

