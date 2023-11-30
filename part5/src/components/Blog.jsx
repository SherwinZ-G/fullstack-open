const Blog = ({ blog }) => {
  const divStyle = {

    border: '2px solid black',
    margin:'0 0 2px 0'
  };
  return (<div style={divStyle}>
    {blog.title} {blog.author}
    <div>{blog.url}</div>
    <div>{blog.likes} <button onClick={blog.handleLike}>like</button></div>
  </div>)

};

export default Blog