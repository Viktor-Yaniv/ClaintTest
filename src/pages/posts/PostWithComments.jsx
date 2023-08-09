import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

const PostWithComments = () => {
  const [decoded, setDecoded] = useState(null);
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    getPost();
    getComments();
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setDecoded(decodedToken);
    }
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Failed to fetch post.");
      setIsLoading(false);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch comments.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to delete post.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-3">{post.title}</h1>
          <div className="card">
            <div className="card-body">
              <p className="card-text">Category: {post.category}</p>
              <p className="card-text">Gender: {post.gender}</p>
              <p className="card-text">Location: {post.location}</p>
              <p className="card-text">Type: {post.type}</p>
              <p className="card-text">Age: {post.age}</p>
              <p className="card-text">Description: {post.description}</p>
              <p className="card-text">Name: {post.name}</p>
              <p className="card-text">User ID: {post.userId}</p>
              <img
                src={`http://localhost:5000/${post.image}`}
                width="100%"
                alt=""
                className="mt-3 mb-3"
              />
              {decoded && decoded.id === post.userId && (
                <div className="mt-3">
                  <Link to={`/edit/${id}`} className="btn btn-info mr-2">
                    Edit
                  </Link>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
              <h2>Comments:</h2>
              {comments.map((comment) => (
                <div key={comment._id}>
                  <p>{comment.text}</p>
                </div>
              ))}
              {/* <AddComment postId={id} /> */}
            </div>
          </div>
        </div>
        </div>
        </div>
        );
        }

        export default PostWithComments;