import React, { FC, SVGProps } from "react";

interface RepeatOneIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

export const RepeatOneIcon: FC<RepeatOneIconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    {/* The rest of your SVG paths */}
  </svg>
);
