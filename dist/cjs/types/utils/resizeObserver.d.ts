import { RefObject } from "react";
declare type Props = {
    ref: RefObject<HTMLDivElement>;
};
export declare const useResizeObserver: ({ ref }: Props) => DOMRectReadOnly | undefined;
export {};
