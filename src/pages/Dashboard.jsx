
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Total Sales" content="$10,000" />
            <DashboardCard title="New Users" content="150" />
            <DashboardCard title="Performance" content="75%" />
        </div>
    );
}

export default Dashboard;
