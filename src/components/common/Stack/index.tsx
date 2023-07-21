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

  return (
    <Box dir="column" {...rest}>
      {arrayChildren.map((child, index) => (
        <Box key={String(index)} mb={isLastItem(index) ? 0 : spacing}>
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default Stack;
