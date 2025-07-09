import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import api from '../services/api';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [formData, setFormData] = useState({ author: '', translations: [{ title: '', content: '', language: localStorage.getItem('lang') || 'en-US' }] });

    useEffect(() => {
        fetchPosts(localStorage.getItem('lang') || 'en-US')
            .then((data) => setPosts(data || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleAdd = () => {
        setSelectedPost(null);
        setFormData({ author: '', translations: [{ title: '', content: '', language: localStorage.getItem('lang') || 'en-US' }] });
        setIsModalOpen(true);
    };

    const handleEdit = (post) => {
        setSelectedPost(post);
        setFormData({
            id: post.id,
            author: post.author,
            translations: [{ title: post.title, content: post.content, language: localStorage.getItem('lang') || 'en-US' }]
        });
        setIsModalOpen(true);
    };

    const handleDelete = (post) => {
        setSelectedPost(post);
        setIsConfirmDeleteOpen(true);
    };

    const handleSubmit = async () => {
        console.log('Sending data:', formData);
        try {
            if (selectedPost) {
                await api.put(`/posts/update/${selectedPost.id}`, formData);
            } else {
                await api.post('/posts/create', formData);
            }
            setIsModalOpen(false);
            fetchPosts(localStorage.getItem('lang') || 'en-US')
                .then((data) => setPosts(data || []))
                .catch((err) => setError(err.message));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/posts/delete/${selectedPost.id}`);
            setIsConfirmDeleteOpen(false);
            fetchPosts(localStorage.getItem('lang') || 'en-US')
                .then((data) => setPosts(data || []))
                .catch((err) => setError(err.message));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsConfirmDeleteOpen(false);
        setFormData({ author: '', translations: [{ title: '', content: '', language: localStorage.getItem('lang') || 'en-US' }] });
    };

    const handleTranslationChange = (index, field, value) => {
        const newTranslations = [...formData.translations];
        newTranslations[index][field] = value;
        setFormData({ ...formData, translations: newTranslations });
    };

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;
    if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Posts</h2>
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Thêm
                </button>
            </div>
            {posts.length > 0 ? (
                <ul className="list-disc pl-5">
                    {posts.map((post) => (
                        <li key={post.id} className="mb-2 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{post?.title || 'No title'}</p>
                                {/* <p>{post?.content || 'No content'}</p> */}
                                <p className="text-sm text-gray-500">Author: {post.author}</p>
                                <p className="text-sm text-gray-500">Created: {new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(post)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">
                            {selectedPost ? 'Sửa Bài Viết' : 'Thêm Bài Viết'}
                        </h3>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="Tác giả"
                            className="w-full p-2 mb-4 border rounded"
                        />
                        {formData.translations.map((translation, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    type="text"
                                    value={translation.title}
                                    onChange={(e) => handleTranslationChange(index, 'title', e.target.value)}
                                    placeholder="Tiêu đề"
                                    className="w-full p-2 mb-2 border rounded"
                                />
                                <textarea
                                    value={translation.content}
                                    onChange={(e) => handleTranslationChange(index, 'content', e.target.value)}
                                    placeholder="Nội dung"
                                    className="w-full p-2 mb-2 border rounded h-24"
                                />
                                <select
                                    value={translation.language}
                                    onChange={(e) => handleTranslationChange(index, 'language', e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    {translation.language === 'vi-VN' ? (
                                        <>
                                            <option value="vi-VN">Tiếng Việt (vi-VN)</option>
                                            <option value="en-US">English (en-US)</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="en-US">English (en-US)</option>
                                            <option value="vi-VN">Tiếng Việt (vi-VN)</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        ))}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Dialog */}
            {isConfirmDeleteOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
                        <h3 className="text-xl font-bold mb-4">Xác Nhận Xóa</h3>
                        <p>Bạn có chắc muốn xóa bài viết "{selectedPost?.Translation?.Title}"?</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsPage;