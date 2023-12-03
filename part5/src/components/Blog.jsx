import Togglable from "./Togglable";
const Blog = ({ blog, handleLike,handleDelete }) => {
  const divStyle = {
    border: "2px solid black",
    margin: "0 0 2px 0",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={divStyle}>
      <h4 style={{ display: "inline", margin: "0 10px 0 0" }}>
        {" "}
        {blog.title}{" "}
      </h4>
      <Togglable buttonLabel="view">
        <div>author: {blog.author}</div>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}{" "}
          <button onClick={handleLike}>add like</button>
        </div>
        <button onClick={handleDelete} style={{backgroundColor:"blue",color:"white"}}>remove</button>
      </Togglable>
    </div>
  );
};

export default Blog