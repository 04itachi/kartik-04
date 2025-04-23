import React, { useState } from "react";
import {
  LineChart,
  Area,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { BsArrowsAngleExpand ,BsPlusCircle  } from "react-icons/bs";
import './App.css';

const chartData = [
  { name: "Point 1", price: 63000 },
  { name: "Point 2", price: 63038 },
  { name: "Point 3", price: 63002 },
  { name: "Point 4", price: 63026 },
  { name: "Point 5", price: 63059 },
  { name: "Point 6", price: 63030 },
  { name: "Point 7", price: 62999 },
  { name: "Point 8", price: 63015 },
  { name: "Point 9", price: 63001 },
  { name: "Point 10", price: 62967 },
  { name: "Point 11", price: 63002 },
  { name: "Point 12", price: 63038 },
  { name: "Point 13", price: 63017 },
  { name: "Point 14", price: 62984 },
  { name: "Point 15", price: 63016 },
  { name: "Point 16", price: 63045 },
  { name: "Point 17", price: 63024 },
  { name: "Point 18", price: 63004 },
  { name: "Point 19", price: 62958 },
  { name: "Point 20", price: 62985 },
  { name: "Point 21", price: 63017 },
  { name: "Point 22", price: 62998 },
  { name: "Point 23", price: 63021 },
  { name: "Point 24", price: 63041 },
  { name: "Point 25", price: 63014 },
  { name: "Point 26", price: 62982 },
  { name: "Point 27", price: 63008 },
  { name: "Point 28", price: 62969 },
  { name: "Point 29", price: 63013 },
  { name: "Point 30", price: 63135 },
  { name: "Point 31", price: 63113 },
  { name: "Point 32", price: 63140 },
  { name: "Point 33", price: 63120 },
  { name: "Point 34", price: 63144 },
  { name: "Point 35", price: 63105 },
  { name: "Point 36", price: 63132 },
  { name: "Point 37", price: 63161 },
  { name: "Point 38", price: 63185 },
  { name: "Point 39", price: 63164 },
  { name: "Point 40", price: 63138 },
  { name: "Point 41", price: 63105 },
  { name: "Point 42", price: 63067 },
  { name: "Point 43", price: 63101 },
  { name: "Point 44", price: 63132 },
  { name: "Point 45", price: 63163 },
  { name: "Point 46", price: 63132 },
  { name: "Point 47", price: 62966 },
  { name: "Point 48", price: 63001 },
  { name: "Point 49", price: 62979 },
  { name: "Point 50", price: 63019 },
  { name: "Point 51", price: 63053 },
  { name: "Point 52", price: 63010 },
  { name: "Point 53", price: 62984 },
  { name: "Point 54", price: 63018 },
  { name: "Point 55", price: 63043 },
  { name: "Point 56", price: 63019 },
  { name: "Point 57", price: 63050 },
  { name: "Point 58", price: 63081 },
  { name: "Point 59", price: 63099 },
  { name: "Point 60", price: 63135 },
  { name: "Point 61", price: 63113 },
  { name: "Point 62", price: 63140 },
  { name: "Point 63", price: 63120 },
  { name: "Point 64", price: 63144 },
  { name: "Point 65", price: 63105 },
  { name: "Point 66", price: 63132 },
  { name: "Point 67", price: 63161 },
  { name: "Point 68", price: 63185 },
  { name: "Point 69", price: 63164 },
  { name: "Point 70", price: 63138 },
  { name: "Point 71", price: 63105 },
  { name: "Point 72", price: 63067 },
  { name: "Point 73", price: 63101 },
  { name: "Point 74", price: 63132 },
  { name: "Point 75", price: 63163 },
  { name: "Point 76", price: 63136 },
  { name: "Point 77", price: 63109 },
  { name: "Point 78", price: 63076 },
  { name: "Point 79", price: 63042 },
  { name: "Point 80", price: 63078 },
  { name: "Point 81", price: 63110 },
  { name: "Point 82", price: 63088 },
  { name: "Point 83", price: 63058 },
  { name: "Point 84", price: 63091 },
  { name: "Point 85", price: 63116 },
  { name: "Point 86", price: 63096 },
  { name: "Point 87", price: 63132 },
  { name: "Point 88", price: 63106 },
  { name: "Point 89", price: 63125 },
  { name: "Point 90", price: 63150 },
  { name: "Point 91", price: 63129 },
  { name: "Point 92", price: 63091 },
  { name: "Point 93", price: 63119 },
  { name: "Point 94", price: 63148 },
  { name: "Point 95", price: 63123 },
  { name: "Point 96", price: 63095 },
  { name: "Point 97", price: 63121 },
  { name: "Point 98", price: 63082 },
  { name: "Point 99", price: 63057 },
  { name: "Point 100", price: 63022 },
  { name: "Point 101", price: 63050 },
  { name: "Point 102", price: 63075 },
  { name: "Point 103", price: 63051 },
  { name: "Point 104", price: 63079 },
  { name: "Point 105", price: 63059 },
  { name: "Point 106", price: 63021 },
  { name: "Point 107", price: 63056 },
  { name: "Point 108", price: 63093 },
  { name: "Point 109", price: 63055 },
  { name: "Point 110", price: 63024 },
  { name: "Point 111", price: 62998 },
  { name: "Point 112", price: 63036 },
  { name: "Point 113", price: 63001 },
  { name: "Point 114", price: 63029 },
  { name: "Point 115", price: 63066 },
  { name: "Point 116", price: 63033 },
  { name: "Point 117", price: 63053 },
  { name: "Point 118", price: 63078 },
  { name: "Point 119", price: 63055 },
  { name: "Point 120", price: 63020 }
];
// const chartData = Array.from({ length: 120 }, (_, i) => ({
//   name: `Point ${i + 1}`,
//   price: Math.floor(Math.random() * (65000 - 60000 + 1)) + 60000
// }));

const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
const ranges = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

function App() {

    const [activeTab, setActiveTab] = useState("Chart");
    const [activeRange, setActiveRange] = useState("1w");
  
    const currentPrice = 63179.71;
    const change = 2161.42;
    const changePercent = 3.54;
  
    return (
      <div className="dashboard">
        <div className="price-header">
          <h1>
            {currentPrice.toLocaleString()} <sup>USD</sup>
          </h1>
          <p className="price-change">+{change.toLocaleString()} ({changePercent}%)</p>
         
        </div>
  
        <div className="tabs">
          {tabs.map(tab => (
            <div
              key={tab}
              className={`tab ${tab === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
  
        <div className="toolbar">
          <div className="left-controls">
            <button><BsArrowsAngleExpand /> Fullscreen</button>
            <button><BsPlusCircle />Compare</button>
          </div>
          <div className="range-selector">
            {ranges.map(range => (
              <button
                key={range}
                className={range === activeRange ? "active" : ""}
                onClick={() => setActiveRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
  
        <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart  data={chartData} >
          
            <XAxis dataKey="name" tick={false}
            />
            <YAxis domain={["auto", "auto"]} tick={false}/>
            <Tooltip
      contentStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',   // Background color of the tooltip
        borderRadius: '5px',  // Rounded corners
        border: '1px solid #ccc',  // Border color of the tooltip
        padding: '10px',   // Padding inside the tooltip
      }}
      labelStyle={{
        fontWeight: 'bold',   // Make the label bold
        color: 'red',   // Change label color
      }}
      formatter={(value) => [`$${value.toLocaleString()}`]}   // Custom tooltip value format
      
    />
            
            <ReferenceLine x="Point 20"  stroke="#e0e0e0" />
            <ReferenceLine x="Point 40"  stroke="#e0e0e0" />
            <ReferenceLine x="Point 60"  stroke="#e0e0e0" />
            <ReferenceLine x="Point 80"  stroke="#e0e0e0" />
            <ReferenceLine x="Point 100"  stroke="#e0e0e0" />

            <ReferenceLine x="Point 45"  stroke="#999999"  />
            <ReferenceLine
  y={63163}
  stroke="#999999"
  label={({ viewBox }) => {
    const { y, width } = viewBox;
    const labelText = "64484";
    return (
      <>
        <rect
          x={width - 55}
          y={y - 10}
          width={55}
          height={20}
          fill="rgb(0, 0, 0)"
          rx={4}
        />
        <text
          x={width - 10}
          y={y}
          fill="rgb(250, 247, 247)"
          fontSize={12}
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="end"
          alignmentBaseline="middle"
        >
          {labelText}
        </text>
      </>
    );
  }}
/>
            <Area
      type="linear"
      dataKey="price"
      stroke="#4f46e5"            // Line color
      fill="rgba(79, 70, 229, 0.1)" // Fill color beneath the line
      strokeWidth={2}
    />
          </AreaChart >
        </ResponsiveContainer>
        
        </div>
      </div>
    );
};

export default App;
