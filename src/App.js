import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import PlotDisplay from "./components/PlotDisplay";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>📊 CSV Plot Visualizer</h1>
        <p>Upload your CSV file and interactively visualize your data.</p>
      </header>
      <FileUpload setData={setData} setHeaders={setHeaders} />
      {data.length > 0 && <PlotDisplay data={data} headers={headers} />}
    </div>
  );
}

export default App;
