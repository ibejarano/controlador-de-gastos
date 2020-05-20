import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function OptionButton({ options }) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    document.addEventListener("click", closeMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);

    document.removeEventListener("click", closeMenu);
  };

  const Options = options.map((option) => (
    <button key={option.legend} className="option" onClick={option.onClick}>
      {option.legend}
    </button>
  ));

  return (
    <React.Fragment>
      <button type="button" className="dropdown-options" onClick={openMenu}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
      {showMenu && <React.Fragment>{Options}</React.Fragment>}
    </React.Fragment>
  );
}
