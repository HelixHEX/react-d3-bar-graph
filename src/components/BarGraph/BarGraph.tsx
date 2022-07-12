import React, { RefObject, useState } from "react";
import { select, axisLeft, axisBottom, scaleLinear, scaleBand } from "d3";
import { useRef } from "react";
import { useEffect } from "react";
type Props = {
  data: Array<any>;
  xValue: string;
  yValue: string;
  yRange: number;
  ticks?: number;
  width?: number | string;
  height?: number | string;
  styles?: any;
  xAxisStyles?: any;
  yAxisStyles?: any;
  axisStyles?: any;
  title?: string;
  xAxisSlanted?: boolean;
  titleStyles?: any;
  colors?: any;
};

type ObserverProps = {
  ref: RefObject<HTMLDivElement>;
};

const applyStyles = (styles: any) => {
  return (selection: any) => {
    for (var property in styles) {
      selection.style(property, styles[property]);
    }
  };
};

const useResizeObserver = ({ ref }: ObserverProps) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly>();
  useEffect(() => {
    const observeTarget = ref.current!;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export const BarGraph = ({
  data,
  xValue,
  yValue,
  yRange,
  ticks = 5,
  width = 400,
  height = 400,
  styles,
  xAxisStyles,
  yAxisStyles,
  axisStyles,
  title = "",
  xAxisSlanted = false,
  titleStyles,
  colors = ["black"],
}: Props) => {
  const svgRef = useRef() as React.MutableRefObject<SVGSVGElement>;
  const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const dimensions = useResizeObserver({ ref: wrapperRef });
  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 60, left: 50 };
    const svg = select(svgRef.current).style("overflow", "visble");

    if (!dimensions) return;
    const xScale = scaleBand()
      .domain(data.map((value) => value[xValue]) as any)
      .rangeRound([margin.left, dimensions.width - margin.right])
      .padding(0.5);
    const xAxis = axisBottom(xScale).ticks(data.length);

    var maxHeight = 0;
    svg
      .selectAll("text.foo")
      .data(xScale.domain())
      .enter()
      .append("text")
      .text(function (d) {
        return d;
      })
      .each(function (d) {
        maxHeight = Math.max(
          maxHeight,
          this.getBBox().width + xAxis.tickSize() + xAxis.tickPadding()
        );
      })
      .remove();

    const yScale = scaleLinear()
      .domain([0, yRange]) // todo
      .rangeRound([dimensions.height - maxHeight, margin.top]);

    if (xAxisSlanted) {
      svg
        .select<SVGSVGElement>(".x-axis")
        .style("transform", `translate(0,${dimensions.height - maxHeight}px)`)
        .call(applyStyles(xAxisStyles ? xAxisStyles : axisStyles))
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    } else {
      svg
        .select<SVGSVGElement>(".x-axis")
        .style("transform", `translate(0,${dimensions.height - maxHeight}px)`)
        .call(applyStyles(xAxisStyles ? xAxisStyles : axisStyles))
        .call(xAxis);
    }

    const yAxis = axisLeft(yScale).ticks(ticks);
    svg
      .select<SVGSVGElement>(".y-axis")
      .style("transform", `translate(${margin.left}px,0px)`)
      .call(applyStyles(yAxisStyles ? yAxisStyles : axisStyles))
      .call(yAxis)
      .attr("x", -margin.left);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .call(applyStyles(styles))
      .attr("x", (value) => xScale(value[xValue]) as any)
      .attr("y", () => maxHeight - dimensions.height)
      .attr("width", xScale.bandwidth)
      .attr(
        "height",
        (value) => dimensions.height - maxHeight - yScale(value[yValue])
      )
      .attr("fill", (_, i) => colors[i]);
  }, [
    yRange,
    xValue,
    yValue,
    dimensions,
    data,
    styles,
    yAxisStyles,
    axisStyles,
    xAxisStyles,
    ticks,
  ]);

  return (
    <>
      <div style={{ width, height }} ref={wrapperRef}>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            ...titleStyles,
          }}
        >
          {title}
        </h1>
        <svg
          overflow={"visible"}
          display="block"
          width="100%"
          height={"auto"}
          ref={svgRef}
        >
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};
