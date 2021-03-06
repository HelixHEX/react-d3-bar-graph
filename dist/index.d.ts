declare type Props = {
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
    colors?: Array<any>;
    marginBottom?: number;
};
declare const BarGraph: ({ data, xValue, yValue, yRange, ticks, width, height, styles, xAxisStyles, yAxisStyles, axisStyles, title, xAxisSlanted, titleStyles, colors, marginBottom }: Props) => JSX.Element;

export { BarGraph };
