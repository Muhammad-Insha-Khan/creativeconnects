import React, { useState } from 'react';
import axios from 'axios';
import "../styles/RatingSystem.css"

const RatingSystem = ({ currentUserId, currentUserRole }) => {
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [userType, setUserType] = useState('buyer');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [previousRatings, setPreviousRatings] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/${userType}/email/${email}`);
            setSelectedUser(response.data);
            setError('');
            fetchPreviousRatings(response.data._id);
        } catch (err) {
            setError('User not found');
            setSelectedUser(null);
            setPreviousRatings([]);
        }
    };

    const fetchPreviousRatings = async (ratedId) => {
        try {
            const res = await axios.get(`https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/ratings/${ratedId}`);
            setPreviousRatings(res.data);
        } catch (err) {
            console.error('Error fetching ratings:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUserId || !currentUserRole) {
            setError('Missing rater ID or role. Please make sure you are logged in.');
            return;
        }

        if (!selectedUser) {
            setError('Please select a user to rate.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/ratings/ratings', {
                ratedId: selectedUser._id,
                ratedRole: userType,
                raterId: currentUserId,
                raterRole: currentUserRole,
                rating,
                comment,
            });

            setMessage('Rating submitted successfully');
            setError('');
            setComment('');
            setRating(1);
            fetchPreviousRatings(selectedUser._id);
        } catch (error) {
            setError(error.response?.data?.message || 'Rating submission failed');
            setMessage('');
        }
    };

    const averageRating =
        previousRatings.length > 0
            ? (
                previousRatings.reduce((sum, r) => sum + r.rating, 0) /
                previousRatings.length
            ).toFixed(1)
            : null;

    // Custom Star Rating UI
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => setRating(i)}
                    style={{
                        fontSize: '30px',
                        cursor: 'pointer',
                        color: i <= rating ? '#ffd700' : '#ccc',
                        marginRight: '5px'
                    }}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="rating-container max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h3 className="rating-title text-2xl font-semibold mb-4 text-center">
                Rate a {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h3>

            <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="rating-select w-full p-2 border rounded mb-3"
            >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="skillswapper">SkillSwapper</option>
            </select>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                className="rating-email w-full p-2 border rounded mb-3"
            />

            <button
                onClick={handleSearch}
                className="rating-search-button w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Search User
            </button>

            {selectedUser && (
                <div className="rating-selected-user mt-6">
                    <p className="rating-user-info font-medium">
                        <strong>User found:</strong> {selectedUser.firstName} {selectedUser.lastName}
                    </p>

                    <label className="rating-label block mt-4 font-medium">Rating:</label>
                    <div className="rating-stars mb-3">{renderStars()}</div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment"
                        className="rating-comment w-full mt-4 p-2 border rounded"
                    />

                    <button
                        onClick={handleSubmit}
                        className="rating-submit w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700"
                    >
                        Submit Rating
                    </button>

                    <hr className="rating-divider my-6" />

                    <h4 className="rating-previous-title text-lg font-semibold mb-2">Previous Ratings</h4>

                    {averageRating && (
                        <p className="rating-average mb-2">
                            <strong>Average Rating:</strong> {averageRating}/5
                        </p>
                    )}

                    {previousRatings.length === 0 ? (
                        <p className="rating-no-results text-gray-500">No ratings yet for this user.</p>
                    ) : (
                        previousRatings.map((r) => (
                            <div
                                key={r._id}
                                className="rating-previous-entry border p-3 rounded mb-3 bg-gray-50"
                            >
                                <strong>Rating:</strong> {r.rating}/5 <br />
                                {r.comment && (
                                    <>
                                        <strong>Comment:</strong> {r.comment} <br /><br />
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {error && <p className="rating-error text-red-600 mt-3">{error}</p>}
            {message && <p className="rating-success text-green-600 mt-3">{message}</p>}
        </div>
    );
};

export default RatingSystem;
