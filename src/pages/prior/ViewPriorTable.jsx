import { useQuery } from "@tanstack/react-query";
import { getAllPrior } from "../../Services/PatientService";
import { useState } from "react";
import DataTable from "react-data-table-component";

const ViewPriorTable = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['priorAuthorization'],
        queryFn: getAllPrior
    }
    );
    console.log(data, "hello");

    const [searchTerm, setSearchTerm] = useState('');
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.patientId.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const columns = [
        {
            name: "ID",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: "Patient Name",
            selector: (row) => row.patientId.name,
            sortable: true,
            width: "170px",
        },
        {
            name: "Age",
            selector: (row) => row.patientId.age,
            sortable: true,
            width: "100px",
        },
        {
            name: "Treatment Type",
            selector: (row) => row.treatmentType,
            sortable: true,
        },
        {
            name: "Insurance Plan",
            selector: (row) => row.insurancePlan,
            sortable: true,
        },
        {
            name: "Date of Service",
            selector: (row) => new Date(row.dateOfService).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Diagnosis Code",
            selector: (row) => row.diagnosisCode,
            sortable: true,
        },
        {
            name: "Medication",
            selector: (row) => row.medication,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <span style={{ color: row.status === 'Pending' ? 'red' : 'black' }}>
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Provider Notes",
            selector: (row) => row.providerNotes,
        },
        {
            name: "Insurance Company",
            selector: (row) => row.insuranceCompany,
        },
    ];
    return (
        <div>
            <h2 className="font-semibold">Prior Authorization Data</h2>
            <input
                type="text"
                placeholder="Search by patient name"
                className="border rounded p-1 mt-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                responsive
            />
        </div>
    )
}

export default ViewPriorTable