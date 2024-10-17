
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Total prior" content="$10,000" />
            <DashboardCard title="New patients" content="20" />
        </div>
    );
}

export default Dashboard;
