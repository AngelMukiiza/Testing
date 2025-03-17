// src/PostsList.js
import React, { useEffect, useState } from 'react';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    );
};

export default PostsList;
