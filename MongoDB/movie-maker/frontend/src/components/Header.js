import React from "react";
import { HashLink as Link} from 'react-router-hash-link'

const Header = () => {
  return (
    <div className="topnav">
        {/* Finds div with ID 'form' and take us there */}
        <a className="logo" href="#form">Movie Maker</a>
        <div className="search-container">
            <form>
                <a href="/">Add Movies</a>
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>
        </div>
    </div>
  );
}

export default Header;