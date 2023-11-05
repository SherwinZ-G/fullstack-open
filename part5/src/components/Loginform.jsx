const LoginForm = (props) => {
    return (
      <div>
        <form onSubmit={props.handleLogin}>
          <div>
            username:
            <input
              value={props.userName}
              name="Username"
              onChange={props.handleUsernameChange}
            ></input>
          </div>
          <div>
            password:
            <input
              value={props.password}
              name="Password"
              onChange={props.handlePasswordChange}
            ></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );

}
export default LoginForm;