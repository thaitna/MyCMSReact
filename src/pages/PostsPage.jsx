import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://localhost:7290/api/post/list', {
                    headers: { 'Accept-Language': localStorage.getItem('lang') || 'en-US' },
                });
                console.log('API called for Slides:', response.data);
                setPosts(response.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;
    if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.length > 0 ? (
                <ul className="list-disc pl-5">
                    {posts.map((post) => (
                        <li key={post.id} className="mb-2">
                            {post.title} - {post.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default PostsPage;