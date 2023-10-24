import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUsername] = useState([''])
  const [password, setPassword] = useState([''])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("走到这里了")
    try {
      const user = await loginService.login({
        userName,
        password,
      });

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
      return (
        <div>
          <h2>blogs</h2>
          <h1>{errorMessage}</h1>
          <form onSubmit={handleLogin}>
            <div>
              username:
              <input
                value={userName}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              ></input>
            </div>
            <div>
              password:
              <input
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              ></input>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      );
  }
  else {
      return (
        <div>
          <h2>blogs</h2>
          <div>
            <h2>Username</h2>
            {userName}
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      );
}



}

export default App