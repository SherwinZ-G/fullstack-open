import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Loginform"
import loginService from "./services/login";
import blogService from "./services/blogs";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUsername] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [nBlog, setNblog] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //  noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("走到这里了");
    try {
      const user = await loginService.login({
        username: userName,
        password,
      });
      //登录之后可以保存token
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.location.reload();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    console.log("已调用create blogs");
    console.log(user)
    try {
      const newBlogData = {
        author: author,
        url: url,
        user: user,
        title: title,
        likes: 2,
      };

      // 在此处获取用户的 JWT，你应该有一个方式来获取用户的身份验证令牌
      const userToken = user.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`, // 包含 JWT 的请求头
        },
      };

      await axios.post("http://localhost:3003/api/blogs", newBlogData, config)
    } catch (exception) {
      setErrorMessage("something went wrong when create please try again");
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <h1>{errorMessage}</h1>
        <LoginForm
          userName={userName}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          <h2>Hi user: {user.username}</h2>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
        <div>
          logout: <button onClick={handleLogout}>logout</button>
        </div>


        <div>{nBlog === "" ? null : nBlog}</div>
      </div>
    );
  }
};

export default App;
