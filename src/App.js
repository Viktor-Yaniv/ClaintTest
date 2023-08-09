import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
//import Posts from "./pages/Posts";
import Profile from "./pages/User/Profile";
import AboutUs from "./pages/AboutUs";
import NoPage from "./pages/NoPage";
import UserList from "./pages/components/UserList";

import EditUser from "./pages/components/EditUser";
//posts
import PostList from "./pages/posts/PostList";
import AddPost from "./pages/posts/AddPost";
import EditPost from "./pages/posts/EditPost";
import Post from "./pages/posts/Post";
import SomePosts from "./pages/posts/SomePosts";
import Postwc from "./pages/posts/PostWithComments";

//user
import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import GetUserById from "./pages/User/GetUserById";

//messages to user
import SendMessages from "./pages/components/SendMessages";
import AllMessages from "./pages/components/AllMessages";


// import Account from "./pages/User/Profile";



export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "calc(100vh - 150px)" }}>
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="Profile" element={<Profile />} /> */}
          <Route path="AboutUs" element={<AboutUs />} />

          <Route path="register" element={<UserRegister />} />
          <Route path="UserLogin" element={<UserLogin />} />
          <Route path="Profile" element={<Profile />} />

          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<GetUserById/>} />
          <Route path="users/edit/:id" element={<EditUser />} />

          <Route path="sendMessage/:id" element={<SendMessages />} />
          <Route path="AllMessages" element={<AllMessages />} />


          <Route path="posts/:id" element={<Post />} />
          <Route path="posts" element={<PostList />} />
          <Route path="someposts" element={<SomePosts />} />
          <Route path="Postwc" element={<Postwc />} />
          <Route path="posts/add" element={<AddPost />} />
          <Route path="posts/edit/:id" element={<EditPost />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>

    </BrowserRouter>
    
    
  );
}
