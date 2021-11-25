// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { ImageString } from "../../../const/assets/ImageString";
import "./Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      activeItemId: this.props.mainMenuState,
    };
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.mainMenuState !== undefined) {
      this.setState({
        activeItemId: newProps.mainMenuState,
      });
    }
  }

  onMenuItemClick(event, item) {
    if (!this.props.canInteract) {
      return;
    }
    this.setState({ activeItemId: item.id });
    this.props.onMenuItemClick(event, item);
  }

  getPathRender(value) {
    if (value > 0) {
      var arr = [];
      for (var i = 0; i < value; i++) {
        arr.push(<span key={i} className={`path${i + 1}`}></span>);
      }
      return arr;
    }
  }

  render() {
    // const { items, activeItemId } = this.state;
    // console.log(items);

    return (
      <>
        <div className="desktop__logo">
          <img src={ImageString.LOGOR1} alt="Logo" />
        </div>
        <ul className="bottom-icons-nav bottom-icons-nav--withtext">
          {this.props.backButton && (
            <li
              key={"blackButton"}
              className="menuBackButton"
              onClick={(event) => this.props.onBackButtonClick(event)}
            >
              <a style={{ justifyContent: "center" }}>
                {/* <span> &lt; Back</span> */}
                <i className="icon-Lobby"></i>
                <span> LOBBY</span>
              </a>
            </li>
          )}
          {this.state.items.map(
            (item) =>
              !item.disabled && (
                <li
                  key={item.id}
                  onClick={(event) => this.onMenuItemClick(event, item)}
                >
                  <a
                    className={
                      item.id == this.state.activeItemId ? "active" : ""
                    }
                  >
                    <i className={item.class}></i>
                    <span>{item.name}</span>
                  </a>
                </li>
              )
          )}
        </ul>
      </>
    );
  }
}

export default Menu;
