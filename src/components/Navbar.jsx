import { useState } from "react";


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <nav className="navbar">
                <h1 className="brand">Brand</h1>
                <button onClick={() => setMenuOpen(true)} className="menu-button">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <ul className="nav-links">
                    <li><a href="#" className="nav-item">Home</a></li>
                    <li><a href="#" className="nav-item">Top Items</a></li>
                    <li><a href="#" className="nav-item">Bestsellers</a></li>
                    <li><a href="#" className="nav-item">About</a></li>
                </ul>
            </nav>
            
            {menuOpen && (
                <div className="mobile-menu">
                    <div className="menu-content">
                        <button onClick={() => setMenuOpen(false)} className="close-button">
                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <ul>
                            <li><a href="#" className="nav-item">Home</a></li>
                            <li><a href="#" className="nav-item">Top Items</a></li>
                            <li><a href="#" className="nav-item">Bestsellers</a></li>
                            <li><a href="#" className="nav-item">About</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
