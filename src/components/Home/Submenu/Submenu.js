// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

const loadingStyle = {
  padding: "0rem 1.75rem",
  color: "white",
  marginTop: "2rem",
  lineHeight: "1.5rem",
  textAlign: "center"
};

const highlightStyle = {
  color: "white"
};

class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = { sideMenuOpen: true, };
  }

  onSubMenuItemClick(event, submenu) {
    this.props.onSubMenuItemClick(event, submenu);
  }

  ToggleSideMenu = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      sideMenuOpen: !prevState.sideMenuOpen
    }))
    // this.props.closeMenu();
  }

  render() {
    let { subMenus, item, activeSubMenu } = this.props;
    if (!activeSubMenu) { activeSubMenu = { id: -1 } }

    return (
      <>
        {(this.props.inTransition) ?
          (null)
          : (
            <>
              <div className={`sideMenuOpenButtonContainer ${this.state.sideMenuOpen ? 'hide-on-desktop' : ''}`}>
                {/* <span className="sideMenuOpenButton" onClick={(e) => this.ToggleSideMenu(e)}></span> */}
                <img className="sideMenuOpenButton" onClick={(e) => this.ToggleSideMenu(e)} src="/3dAssets/UI/play-button.svg" alt="slideMenuButton"></img>
              </div>
              <div className={`submenu-container ${this.state.sideMenuOpen ? ('active expended') : ('')} `}>
                <div className={`second-level-nav`}>
                  <h3 className="second-level-nav__title">
                    <div>{item.name}</div>
                    <a className="show-on-desktop" onClick={(e) => this.ToggleSideMenu(e)}>
                      <img alt="closeButton" className="submenuCLoseButton" src="assets/images/close.png" />
                    </a>
                  </h3>
                  <ul className={`scrollable-part ${!item.isContextMenuTitle ? "" : "scrollable-part__notitle"}`}>
                    {subMenus.map((submenu) => (
                      <li className={`${submenu.id === activeSubMenu.id ? "active" : ""}`}
                        key={submenu.id} onClick={(event) => this.onSubMenuItemClick(event, submenu)}><a style={(submenu.id === activeSubMenu.id) ? (highlightStyle) : (null)} >{submenu.name}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
      </>
    );
  }
}

export default Submenu;
