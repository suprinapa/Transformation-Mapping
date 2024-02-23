import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

// Sample data
// const sampleData = [
//     {
//         id: 1,
//         columnName: "Column 1",
//         alias: "Alias 1",
//         isPrimary: true,
//     },
//     {
//         id: 2,
//         columnName: "Column 2",
//         alias: "Alias 2",
//         isPrimary: false,
//     },
// ];

const Component = ({data: tableData}) => {
    const [data, setData] = React.useState({ nodes: tableData });

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

    const handleDelete = (id) => {
        setData((state) => ({
            ...state,
            nodes: state.nodes.filter((node) => node.id !== id),
        }));
    };

    const COLUMNS = [
        {
            label: "Column Name",
            renderCell: (item) => (
                <span>{item.columnName}</span>
            ),
        },
        {
            label: "Alias",
            renderCell: (item) => (
                <input
                    type="text"
                    style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                    }}
                    value={item.alias}
                    onChange={(event) =>
                        handleUpdate(event.target.value, item.id, "alias")
                    }
                />
            ),
        },
        {
            label: "Is Primary",
            renderCell: (item) => (
                <input
                    type="checkbox"
                    checked={item.isPrimary}
                    readOnly={true}
                    onChange={(event) =>
                        handleUpdate(event.target.checked, item.id, "isPrimary")
                    }
                />
            ),
        },
        {
            label: "Actions",
            renderCell: (item) => (
                <div>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                    <button onClick={() => handleSave(item)}>Save</button>
                </div>
            ),
        },
    ];

    const handleSave = (item) => {
        console.log("Save item:", item);
    };

    return (
        <>
            <CompactTable columns={COLUMNS} data={data} theme={theme} />

            <br />
        </>
    );
};

export default Component;
