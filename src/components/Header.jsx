
const Header = () => {
    return (
        <header className="bg-white p-4 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold">Welcome to Your Dashboard</h1>
            <input
                type="text"
                placeholder="Search..."
                className="border rounded p-2"
            />
        </header>
    );
}

export default Header;
