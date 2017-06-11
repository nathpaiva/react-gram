import React, { Component } from 'react';

import TimeLineApi from '../stores/TimeLineApi';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { msg: '' };
  }

  search(e) {
    e.preventDefault();
    this.props.store.dispatch(TimeLineApi.searchUser(this.searchInput.value));
    this.searchInput.value = '';
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState({ msg: this.props.store.getState().notification });
    });
  }

  render() {
    return (
      <header className="header container">
        <h1 className="header-logo">
          Instalura
        </h1>

        <form onSubmit={this.search.bind(this)} className="header-busca">
          <input type="text" name="search" placeholder="Pesquisa" ref={input => this.searchInput = input} className="header-busca-campo" />
          <input type="submit" value="Buscar" className="header-busca-submit" />
        </form>

        <nav>
          <ul className="header-nav">
            <li className="header-nav-item">
              <span> {this.state.msg} </span>
              <a href="">
                ♡
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
