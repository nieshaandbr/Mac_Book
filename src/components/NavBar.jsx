import {navLinks} from '../constants/index.js'

const NavBar = () => {
    return (
        <header>
            <nav>
                <img src="/logo.svg" alt="Apple logo" />

                <ul>
                    {navLinks.map(({label }) => (
                        <li key={label}>
                            <a href={label}>{label}</a>
                        </li>
                    ))}
                </ul>

                <div className="flex-center gap-3"></div>
                <button>
                    <img src="/search.svg" alt="Search" />
                </button>
                <button>
                    <img src="/cart.svg" alt="Cart" />
                </button>
            </nav>
        </header>
    );
};

export default NavBar;
