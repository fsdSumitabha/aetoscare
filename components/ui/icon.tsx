import { createElement, type JSX, type SVGProps } from "react";
import type { IconNode } from "lucide";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children" | "ref"> & {
  size?: number | string;
};

export type IconComponent = (props: IconProps) => JSX.Element;

/**
 * Builds a Lucide icon as a plain Server Component from the framework-agnostic
 * `lucide` icon data. Unlike lucide-react 1.x (whose icons are client
 * components), these render to static SVG with no hydration cost.
 * Decorative by default: aria-hidden unless the caller overrides it.
 */
export function createIcon(node: IconNode): IconComponent {
  return function Icon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {node.map(([tag, attrs], index) => createElement(tag, { key: index, ...attrs }))}
      </svg>
    );
  };
}
