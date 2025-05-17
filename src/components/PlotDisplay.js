import React, { useState } from "react";
import Plot from "react-plotly.js";
import styles from "./PlotDisplay.module.css";

const PlotDisplay = ({ data, headers }) => {
  const [x, setX] = useState(headers[0]);
  const [y, setY] = useState(headers[1]);
  const [plotType, setPlotType] = useState("scatter");
  const [title, setTitle] = useState("📈 Data Visualization");
  const [xLabel, setXLabel] = useState(headers[0]);
  const [yLabel, setYLabel] = useState(headers[1]);
  const [color, setColor] = useState("#1e88e5");
  const [format, setFormat] = useState("png");

  const extractColumn = (key) => data.map((row) => Number(row[key]));

  const downloadPlot = () => {
    const plotEl = document.getElementById("customPlot");
    window.Plotly.toImage(plotEl, {
      format,
      height: 500,
      width: 900,
    }).then((dataUrl) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `plot.${format}`;
      a.click();
    });
  };

  return (
    <section className={styles.visualizer}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Chart Type</label>
          <select value={plotType} onChange={(e) => setPlotType(e.target.value)}>
            <option value="scatter">Scatter</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>X Axis</label>
          <select value={x} onChange={(e) => { setX(e.target.value); setXLabel(e.target.value); }}>
            {headers.map((h) => <option key={h}>{h}</option>)}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>Y Axis</label>
          <select value={y} onChange={(e) => { setY(e.target.value); setYLabel(e.target.value); }}>
            {headers.map((h) => <option key={h}>{h}</option>)}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className={styles.controlGroup}>
          <label>X Label</label>
          <input type="text" value={xLabel} onChange={(e) => setXLabel(e.target.value)} />
        </div>

        <div className={styles.controlGroup}>
          <label>Y Label</label>
          <input type="text" value={yLabel} onChange={(e) => setYLabel(e.target.value)} />
        </div>

        <div className={styles.controlGroup}>
          <label>Color</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div className={styles.controlGroup}>
          <label>Export</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="svg">SVG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
      </div>

      <div className={styles.plotWrapper}>
        <Plot
          divId="customPlot"
          data={[{
            x: extractColumn(x),
            y: extractColumn(y),
            type: plotType,
            mode: plotType === "scatter" ? "markers" : undefined,
            marker: { color },
          }]}
          layout={{
            title: { text: title, font: { size: 22, family: "Segoe UI" }, x: 0.02 },
            xaxis: { title: { text: xLabel }, gridcolor: "#eee" },
            yaxis: { title: { text: yLabel }, gridcolor: "#eee" },
            margin: { t: 60, l: 60, r: 20, b: 60 },
            paper_bgcolor: "#fff",
            plot_bgcolor: "#f7f9fc",
            font: { color: "#2c3e50" },
            hovermode: "closest",
          }}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
          config={{ responsive: true }}
        />
      </div>

      <button className={styles.exportButton} onClick={downloadPlot}>
        📥 Export as {format.toUpperCase()}
      </button>
    </section>
  );
};

export default PlotDisplay;
