import React from 'react';
import Application from "./components/application/Application";
import { UserProvider } from "./components/auth/providers";
import { isMobileOnly } from 'react-device-detect';
import './App.css'
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.userClaims = null;
  }

  componentDidMount() {
    // if(isMobileOnly){
    //   window.location.href= '/issue/index.html';
    // }
  }

  render() {
    return (
      <UserProvider>
        <Application />
      </UserProvider>
    );
  }
}
