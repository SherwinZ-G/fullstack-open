import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Loginform"
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable"
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
  const [nBlog,setNblog]=useState("")
  // const[createVisible,setCreateVisible]=useState(false)

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

  const handleDelete = async (id) => {
    try {
        const removeBlog= blogs.find((blog) => blog.id === id);
      if (removeBlog) {
        // 在此处获取用户的 JWT，你应该有一个方式来获取用户的身份验证令牌
        const userToken = user.token;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`, // 包含 JWT 的请求头
          },
        };

        await axios.delete(`http://localhost:3003/api/blogs/${id}`, config);
        // 删除成功后更新前端博客列表
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
      }
      
    } catch (exception) {
  setErrorMessage("something went wrong when delete please try again");
}
  

  }

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

  const handleLike = async (id ) => {
    console.log("no problem")
    try {
        const updatedBlog = blogs.find((blog) => blog.id === id);
      if (updatedBlog) {

          const updatedData = {
            ...updatedBlog,
            likes: updatedBlog.likes === null? updatedBlog.likes+1 : 1,
          };

          // 在此处获取用户的 JWT，你应该有一个方式来获取用户的身份验证令牌
          const userToken = user.token;
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // 包含 JWT 的请求头
            },
          };

          await axios.patch(
            `http://localhost:3003/api/blogs/${id}`,
            updatedData,
            config
          );

          // 更新前端的数据状态，比如使用 setBlogs 更新单个博客
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
            )
          );
        }
      
     
    } catch (exception) {
  setErrorMessage("something went wrong when patch please try again");
}
  }

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

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleTitleChange = (e) => {
   setTitle(e.target.value)
  }


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
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);


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
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog.id)} handleDelete={()=>handleDelete(blog.id)} />
        ))}
  
        <Togglable buttonLabel="create">
          <CreateForm
            url={url}
            title={title}
            author={author}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            handleTitleChange={handleTitleChange}
            handleCreate={handleCreate}
            
          />
        </Togglable> 
        <div>
          logout: <button onClick={handleLogout}>logout</button>
        </div>

        {/* <div>{nBlog === "" ? null : nBlog}</div> */}
      </div>
    );
  }
};

export default App;
