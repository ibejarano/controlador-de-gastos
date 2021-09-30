import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyCheckAlt,
  faTools,
  faInfoCircle,
  faSignOutAlt

} from "@fortawesome/free-solid-svg-icons";

const sections = [
  {
    name: "Inicio",
    url: "/wallets",
    icon: faHome,
  },
  {
    name: "Presupuestos",
    url: "/budgets",
    icon: faMoneyCheckAlt,
  },
  {
    name: "Configurar",
    url: "/config",
    icon: faTools,
  },
  {
    name: "Info",
    url: "/info",
    icon: faInfoCircle,
  },
  {
    name: "Logout",
    url: "/logout",
    icon: faSignOutAlt,
  },
];

const StyledLinks = styled.div`
  width: 72px;
  height: 56px;
  background: ${(props) => props.theme.color.yellowText};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;

  text-decoration: none;

  svg {
    font-size: 28px;
    color: ${(props) => props.theme.color.mainBackground};
  }

  p {
    font-size: 10px;
    margin: 0;
  }
  @media (min-width: 600px) {
    width: 52px;
    height: 46px;

    svg {
      font-size: 20px;
      color: ${(props) => props.theme.color.mainBackground};
    }
    p {
      display: none;
    }
  }
`;

const NavItem = ({ section }) => (
  <Link to={section.url}>
    <StyledLinks>
      <FontAwesomeIcon icon={section.icon} />
      <p>{section.name}</p>
    </StyledLinks>
  </Link>
);

const StyledNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  margin-left: -1em;
  background: ${(props) => props.theme.color.yellowText};

  @media (min-width: 600px) {
    top: 16px;
    right: 100px;
    width: min-content;
    height: max-content;
  }
`;

const Navbar = () => (
  <StyledNav>
    {sections.map((sec) => (
      <NavItem key={sec.name} section={sec} />
    ))}
  </StyledNav>
);

export default Navbar;
