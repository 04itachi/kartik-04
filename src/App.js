import React, { useState, useEffect } from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ComposedChart, Bar
} from 'recharts';
import { BsArrowsAngleExpand, BsPlusCircle } from "react-icons/bs";
import './App.css';


const generateChartData = (baseValue, baseVolume, volatility) => {
  const points = [];
  let currentValue = baseValue;
  for (let i = 1; i <= 120; i++) {
    // Value changes slowly or fast depending on volatility
    currentValue += Math.floor(Math.random() * volatility * 2 - volatility);
    const volume = baseVolume + Math.floor(Math.random() * 10 - 5);
    points.push({
      name: `Point ${i}`,
      value: currentValue,
      volume: Math.max(volume, 0),
    });
  }
  return points;
};

// Chart data with different volatilities
const chartDataByRange = {
  "1d": generateChartData(64000, 10, 100),  // High volatility
  "3d": generateChartData(64100, 12, 400),
  "1w": generateChartData(63900, 8, 300),
  "1m": generateChartData(64500, 15, 200),
  "6m": generateChartData(63000, 20, 100),
  "1y": generateChartData(64000, 25, 100),   // Very low volatility
  "max": generateChartData(64000, 20, 100),  // Super smooth
};



const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div >
        <p className="mb-1">${payload[0].value.toFixed(2)}</p>
        <p> {payload[1].payload.volume}</p>
      </div>
    )
  }
  return null
}
const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
const ranges = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

function App() {

  const [activeTab, setActiveTab] = useState("Chart");
  const [activeRange, setActiveRange] = useState("1w");
  const [referenceLines, setReferenceLines] = useState({
    valueMax: 0,
    valueMin: 0,
  });
  

  const generateReferenceLines = (data) => {
    const valueValues = data.map(d => d.value);
    
    const randomValueMax = valueValues[Math.floor(Math.random() * valueValues.length)];
    const randomValueMin = randomValueMax-500
    console.log(randomValueMin,randomValueMax,"heelo");
    return {
      valueMax: randomValueMax,
      valueMin: randomValueMin,
    };
    
    
  };

  useEffect(() => {
    setReferenceLines(generateReferenceLines(chartDataByRange[activeRange]));
  }, [activeRange]);
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
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartDataByRange[activeRange]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5f5af6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#5f5af6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis yAxisId="price" domain={[63000, "auto"]} hide />
            <YAxis yAxisId="volume" orientation="right" domain={["auto", 120]} hide />
            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine x="Point 20" stroke="#e0e0e0" yAxisId="price" />
            <ReferenceLine x="Point 1" stroke="#e0e0e0" yAxisId="price" />
            <ReferenceLine x="Point 120" stroke="#e0e0e0" yAxisId="price" />
            <ReferenceLine x="Point 40" stroke="#e0e0e0" yAxisId="price" />
            <ReferenceLine x="Point 60" stroke="#e0e0e0" yAxisId="price" />
            <ReferenceLine x="Point 80" stroke="#e0e0e0" yAxisId="price" />
            <ReferenceLine x="Point 100" stroke="#e0e0e0" yAxisId="price" />
            <ReferenceLine x="Point 45" stroke="#999999" strokeDasharray="3 3" yAxisId="price" />
            <ReferenceLine
              y={referenceLines.valueMax}
              yAxisId="price" // ✅ this must match your defined axis
              stroke="#999999"
              strokeDasharray="3 3"
              label={({ viewBox }) => {
                if (!viewBox) return null;
                const { y, width } = viewBox;
                return (
                  <>
                    <rect
                      x={width - 20}
                      y={y - 10}
                      width={50}
                      height={20}
                      fill="rgb(0, 0, 0)"
                      rx={4}

                    />
                    <text
                      x={width + 23}
                      y={y}
                      fill="rgb(250, 247, 247)"
                      fontSize={12}
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="end"
                      alignmentBaseline="middle"
                    >
                      {referenceLines.valueMax}
                    </text>
                  </>
                );
              }}
            />
            <ReferenceLine
              y={referenceLines.valueMin}
              yAxisId="price" // ✅ this must match your defined axis

              fill="rgb(250, 247, 247,0.1)"
              // stroke="transparent"
              label={({ viewBox }) => {
                if (!viewBox) return null;
                const { y, width } = viewBox;
                return (
                  <>
                    <rect
                      x={width - 30}
                      y={y - 10}
                      width={50}
                      height={20}
                      fill="#5f5af6"
                      rx={4}

                    />
                    <text
                      x={width + 13}
                      y={y}
                      fill="rgb(250, 247, 247)"
                      fontSize={12}
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="end"
                      alignmentBaseline="middle"
                    >
                      {referenceLines.valueMin}
                    </text>
                  </>
                );
              }}
            />
            {/* Price area chart */}
            <Area
              yAxisId="price"
              type="linear"
              dataKey="value"
              stroke="#5f5af6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />

            {/* Volume bar chart */}
            <Bar yAxisId="volume" dataKey="volume" fill="#e2e8f0" barSize={2} radius={0} />

            {/* Price indicators */}
            <div >
              <p >
                64,850.35
              </p>
              <p>
                63,179.71
              </p>
            </div>
          </ComposedChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default App;
