
const DashboardCard = ({ title, content }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="text-gray-600">{content}</p>
        </div>
    );
}

export default DashboardCard;
