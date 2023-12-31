import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info-subtle">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Wardrobify</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://img.icons8.com/arcade/25/null/trainers.png" /> Shoes
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  {/*
                  // WORK AROUND
                  <NavLink to="/shoes" className={({ isActive }) =>
                    isActive ? "dropdown-item" : "dropdown-item"
                  }>List</NavLink>
                  <NavLink to="/shoes/new" className={({ isActive }) =>
                    isActive ? "dropdown-item" : "dropdown-item"
                  }>Create</NavLink> */}
                  <Link to="/shoes" className="dropdown-item">List</Link>
                  <Link to="/shoes/new" className="dropdown-item">Create</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://img.icons8.com/arcade/25/null/santas-hat.png" /> Hats
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/hats" isActive={false} className={({ isActive }) =>
                    isActive ? "dropdown-item" : "dropdown-item"
                  }>List</NavLink>
                  <NavLink to="/hats/new" className={({ isActive }) =>
                    isActive ? "dropdown-item" : "dropdown-item"
                  }>Create</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
