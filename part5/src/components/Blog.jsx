import Togglable from "./Togglable";
const Blog = ({ blog }) => {
  const divStyle = {

    border: '2px solid black',
    margin: '0 0 2px 0',
  display: 'flex', alignItems: 'center' 
  };
  return (
    <div style={divStyle}>
      <h4 style={{ display: "inline", margin: '0 10px 0 0' }}> {blog.title} </h4>
      <Togglable buttonLabel="view">
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
      </Togglable>
    </div>
  );

};

export default Blog