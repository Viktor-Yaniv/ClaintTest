import React from "react";
import { Link } from "react-router-dom";
import ChatBox from "./ChatBox"; // Import the ChatBox component
import SomePosts from "./posts/SomePosts"; // Import the ChatBox component

const Home = () => {
  
  return (
    <div className="container mt-5">
      <div className="row" style={{direction:'rtl'}}>
        <div className="col-md-6">
          <div>
            <h1 className="display-4"> ברוכים הבאים ל - PetHouse</h1>
            <p className="lead" style={{ direction: "rtl" }}>
              אנחנו קהילה של אוהבי בעלי חיים המוקדשים לעזור לבעלי חיים למצוא את בתיהם לנצח.
              עיין בבעלי החיים הזמינים שלנו או פרסם אחד חדש כדי למצוא להם משפחה אוהבת.
            </p>
            <div className="d-flex justify-content-center">
              <Link to="/Posts" className="btn btn-primary btn-lg me-3">
                הצג את חיות המחמד
              </Link>
              <Link to="/Posts/add" className="btn btn-secondary btn-lg">
                פרסם חיית מחמד
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="border border-primary rounded-circle p-3">
            <img
              src="https://img.freepik.com/free-photo/beautiful-pet-portrait-dog_23-2149218450.jpg?w=1380&t=st=1686840694~exp=1686841294~hmac=a231bf054235ccd0873ba01fa39786ad8a4b5ee2f9e6deb11186e85f27297e4a"
              alt="Cute animals"
              className="img-fluid rounded-circle"
            />
          </div>
        </div>
      </div>
      <div className="row mt-5" >
        <div className="col-md-6">
          <SomePosts />
        </div>
        <div className="col-md-6">
          <div className="chatbox-container">
            <div className="chatbox-wrapper">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
