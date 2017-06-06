import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Header extends Component {

  search(e) {
    e.preventDefault();

    fetch(`http://localhost:8080/api/public/fotos/${this.searchInput.value}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then(fotos => {
        PubSub.publish('timeline', fotos);
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
