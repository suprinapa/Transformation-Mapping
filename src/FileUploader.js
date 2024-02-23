import { useState } from "react";
import Component from "./card";
import MappedTable from "./MappedTable";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploadedTables, setUploadedTables] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false); // New state to track save button click

  const tableData = [
    { id: 1, columnName: "Example 1", alias: "Alias 1", isPrimary: true },
    { id: 2, columnName: "Example 2", alias: "Alias 2", isPrimary: false },
  ];

  const processFile = () => {
    return <Component data={tableData} />;
  };
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      try {
        const uploadedTables = [];
        for (const file of files) {
          // Process file and create corresponding table
          const processedTable = processFile(file);
          uploadedTables.push({ name: file.name, table: processedTable });
        }
        setUploadedTables(uploadedTables);
        setIsUploaded(true); // Set uploaded flag to true
      } catch (error) {
        console.error("Error processing files:", error);
      }
    } else {
      alert("No files selected.");
    }
  };

  const handleClear = () => {
    setFiles([]);
    setUploadedTables([]);
    setIsUploaded(false); // Reset uploaded flag
    setSaveClicked(false); // Reset save button click
    window.location.reload(); // Reload the page
  };

  const handleSaveClick = () => {
    setSaveClicked(true);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          multiple
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <div style={{ marginLeft: "10px" }}>
          <button className="btn btn-success" onClick={handleUpload}>
            Upload
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear Selection
          </button>
        </div>
      </div>

      {uploadedTables.length > 0 &&
        uploadedTables.map((item, index) => (
          <div key={index} style={{ marginTop: "20px" }}>
            <h3 style={{ textAlign: "center" }}>{item.name}</h3>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {item.table}
            </div>
          </div>
        ))}
      {uploadedTables.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      )}

      {isUploaded && saveClicked && (
        <>
          <br />
          <br />
          <MappedTable data={tableData} />
        </>
      )}
    </>
  );
};

export default FileUploader;
