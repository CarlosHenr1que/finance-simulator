import React, { Children } from "react";

import Box from "../Box";
import { Props as BoxProps } from "../Box";

interface StackProps extends BoxProps {
  children: React.ReactNode;
  spacing: number;
}

const Stack: React.FC<StackProps> = ({ children, spacing, ...rest }) => {
  const arrayChildren = Children.toArray(children);

  const isLastItem = (index: number) => arrayChildren.length === index + 1;

  const addVerticalSpacing = (index: number) => {
    if (isLastItem(index)) return 0;

    if (rest.dir !== "row") {
      return spacing;
    }
  };

  const addHorizontalSpacing = (index: number) => {
    if (isLastItem(index)) return 0;

    if (rest.dir == "row") {
      return spacing;
    }
  };

  return (
    <Box dir="column" {...rest}>
      {arrayChildren.map((child, index) => (
        <Box
          key={String(index)}
          mb={addVerticalSpacing(index)}
          mr={addHorizontalSpacing(index)}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default Stack;
