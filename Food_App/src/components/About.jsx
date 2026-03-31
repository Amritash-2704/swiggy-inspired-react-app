import User from './User';
import UserClass from './UserClass';
import { Component } from 'react';

class About extends Component {
  constructor(props) {
    super(props);

    // console.log('parent constructor');
  }
  componentDidMount() {
    // console.log('parent component did mount');
  }

  render() {
    // console.log('parent render');
    return (
      <div className="about">
        <h1>About</h1>
        <p>This is about page, Now its working fine</p>
        {/* <User /> */}
        <UserClass />
      </div>
    );
  }
}

export default About;

/*
this is the class based components now we created a class base components 
Q.  constructor(props)?
Q. super(props)?
*/
