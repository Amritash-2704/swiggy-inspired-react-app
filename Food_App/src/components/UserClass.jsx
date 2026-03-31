import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstName: 'dummy',
        address: 'Default',
      },
    };
    // console.log('Child constructor');
  }

  async componentDidMount() {
    // console.log('Child component did mount ');
    const data = await fetch('https://dummyjson.com/users');
    const json = await data.json();
    this.setState({
      userInfo: json.users[0],
    });
    console.log(json);
  }

  render() {
    const { firstName, lastName, address, email, image } = this.state.userInfo;
    // console.log('child render');

    return (
      <div className="user">
        <div className="about-user">
          <div>
            <img src={image} alt="" />
          </div>
          <h2>
            Name: {firstName} {lastName}
          </h2>
          <h3>
            Location: {address?.address}, {address?.city}, {address?.state}
          </h3>
          <h4>Contact: {email}</h4>
        </div>
      </div>
    );
  }
}
export default UserClass;
