import React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const MappedTable = ({data: tableData}) => {
    const [data, setData] = React.useState({
        nodes:
            tableData
        //     [
        //     { id: 1, columns_name: "Column 1", type: "SETUP" },
        //     { id: 2, columns_name: "Column 2", type: "LEARN" },
        // ],
    });

    const theme = useTheme(getTheme());

    const handleUpdate = (value, id, property) => {
        setData((state) => ({
            ...state,
            nodes: state.nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, [property]: value };
                } else {
                    return node;
                }
            }),
        }));
    };

    const COLUMNS = [
        {
            label: "Columns",
            renderCell: (item) => item.columnName, // Render the specific column name
        },
        {
            label: "Mapped Column",
            renderCell: (item) => (
                <select
                    style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                    }}
                    value={item.type || ''}
                    onChange={(event) =>
                        handleUpdate(event.target.value, item.id, "type")
                    }
                >
                    <option value="">Select</option>
                    <option value="SETUP">Example 1</option>
                    <option value="LEARN">Example 2</option>
                </select>

            ),
        },
        {
            label: "Actions",
            renderCell: (item) => (
                <div>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                </div>
            ),
        },
    ];

    const handleDelete = (id) => {
        setData((state) => ({
            ...state,
            nodes: state.nodes.filter((node) => node.id !== id),
        }));
    };

    const handleSave = (id) => {
        // Implement your save logic here
        console.log(`Saving item with ID: ${id}`);
    };

    return (
        <>
            <CompactTable columns={COLUMNS} data={data} theme={theme} />
            <br />
        </>
    );
};

export default MappedTable;
