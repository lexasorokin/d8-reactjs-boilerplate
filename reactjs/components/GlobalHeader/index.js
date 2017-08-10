import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MainMenu from '../MainMenu';

class GlobalHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menuExpanded: false,
      isSticky: false,
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ menuExpanded: !this.state.menuExpanded });
  }

  componentDidMount() {
    if (window.pageYOffset > 0 && !this.state.isSticky) {
      this.setState({ isSticky: true });
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const sticky = this.state.isSticky;
    if (event.srcElement.body.scrollTop > 0 && !this.state.isSticky) {
      this.setState({ isSticky: true });
    }
    else if (event.srcElement.body.scrollTop <= 0 && this.state.isSticky) {
      this.setState({ isSticky: false });
    }
  }

  render() {

    return (
      <div>

        <div className={`nav-sticky-compensation ${this.state.isSticky ? 'visible' : ''}`}/>

        <nav className={`navbar navbar-toggleable-md ${this.state.isSticky ? 'sticky' : ''}`}>
          <div className="container no-override">

            <button className="navbar-toggler navbar-toggler-right" onClick={this.toggleMenu.bind(this)}>
              <span className="navbar-toggler-icon" />
            </button>

            <Link href="/">
              <a className="navbar-brand">
                <img
                  src={`/static/images/logo.png`}
                  alt="BigBox"
                  className="hidden-md-down d-inline mr-2 w-25"
                />
                BigBox
              </a>
            </Link>

            <MainMenu expanded={this.state.menuExpanded} toggleMenu={this.toggleMenu.bind(this)} />

          </div>
        </nav>
      </div>
    );
  }
}

export default GlobalHeader;
