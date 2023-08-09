import React, { useState } from "react";
import axios from "axios";

const AddComment = ({ postId, setComments }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      postId: postId,
      comment: comment,
    };
    try {
      const response = await axios.post("http://localhost:5000/comments", newComment);
      setComment("");
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Add Comment</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
