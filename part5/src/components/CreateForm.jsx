const createForm = (props) => {
    return (
      <form onSubmit={props.handleCreate}>
        <div>
          title:
          <input
            value={props.title}
            name="blogTitle"
            onChange={handleTitleChange}
          ></input>
        </div>
        <div>
          url:
          <input
            value={props.url}
            name="blogUrl"
            onChange={handleUrlChange}
          ></input>
        </div>
        <div>
          author:
          <input
            value={props.author}
            name="blogauthor"
            onChange={handleAuthorChange}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    );
    
}

export default createForm

