import React, { memo } from "react";

import Text from "../../common/Text";
import Box from "../../common/Box";

interface CardInstallmentProps {
  titles: string[];
  contents: string[];
}
const CardInstallment: React.FC<CardInstallmentProps> = memo(
  ({ titles, contents }) => {
    return (
      <Box
        dir="column"
        width="100%"
        background="secondary"
        py={8}
        px={8}
        radius={8}
      >
        <Box width="100%" justify="space-between">
          {titles.map((title) => (
            <Text key={title} size={14} color="secondary">
              {title}
            </Text>
          ))}
        </Box>
        <Box mt={8} width="100%" justify="space-between">
          {contents.map((content) => (
            <Text key={content} color="primary" size={14} weight="bold">
              {content}
            </Text>
          ))}
        </Box>
      </Box>
    );
  }
);

export default CardInstallment;
