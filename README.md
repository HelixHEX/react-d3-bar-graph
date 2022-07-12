# react-d3-bar-graph 
[![npm](https://img.shields.io/npm/v/react-d3-bar-graph.svg?color=blue&logo=npm)](https://www.npmjs.com/package/react-d3-bar-graph) [![npm](https://img.shields.io/npm/dt/react-d3-bar-graph.svg?color=blue&logo=npm)](https://www.npmjs.com/package/react-d3-bar-graph) 

A component that renders a bar graph using d3

## Install

```bash
npm install --save react-d3-bar-graph

or

yarn add react-d3-bar-graph
```

## Import

```jsx
import { BarGraph } from "react-d3-bar-graph";
```

## Usage

```jsx
<BarGraph
  width={400}
  height={400}
  yRange={100}
  xValue="song"
  yValue="popularity"
  data={data}
  ticks={3}
  axisStyles={{
    color: "#0BC5EA",
    "font-size": "15px",
  }}
  title="Most popular songs"
  xAxisSlanted={true}
  colors={["purple", "red", "black"]}
/>
```

## Props

| Property     | Type    | Required | Default | Description                                                                 |
| ------------ | ------- | -------- | ------- | --------------------------------------------------------------------------- |
| data         | Array   | true     | -       | An array to map the data                                                    |
| xValue       | String  | true     | -       | Value to map x-axis                                                         |
| yValue       | String  | true     | -       | Value to map y-axis                                                         |
| yRange       | Number  | true     | -       | Max y range                                                                 |
| ticks        | Number  | false    | 5       | Number of ticks on y-axis                                                   |
| width        | Number  | false    | 400     | Width of the graph                                                          |
| height       | Number  | false    | 400     | Height of the graph                                                         |
| styles       | Object  | false    | -       | How to style the graph and bars (ex: {{fill: "red"}}  (Note: Using fill will override the **colors** prop)                      |
| xAxisStyles  | Object  | false    | -       | How to style the x-axis (ex: {{color: "purple"}})                           |
| yAxisStyles  | Object  | false    | -       | How to style the y-axis (ex: {{color: "purple"}})                           |
| axisStyles   | Object  | false    | -       | How to style both x and y axis (overrides xAxisStyles and yAxisStyles prop) |
| xAxisSlanted | Boolean | false    | false   | Whether to make the x-axis labels slanted                                   |
| title        | String  | false    | ""      | Title of the graph                                                          |
| titleStyles  | Object  | false    | -       | How to style the title                                                      |
| colors       | Array   | false    | ["black", "red"] | How to style individual bars                                       |
|              |         |          |         |                                                                             |
