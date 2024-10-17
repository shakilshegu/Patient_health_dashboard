import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Divider } from '@mui/material';

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <Divider/>
                <main className="p-4  overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
