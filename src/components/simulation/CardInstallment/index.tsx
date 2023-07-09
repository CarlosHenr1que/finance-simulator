import React from "react";

import Text from "../../common/Text";
import Box from "../../common/Box";

interface CardInstallmentProps {
  order: string;
  price: string;
  debit: string;
}
const CardInstallment: React.FC<CardInstallmentProps> = ({
  order,
  price,
  debit,
}) => {
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
        <Text size={14} color="secondary">
          Parcela
        </Text>
        <Text size={14} color="secondary">
          Valor
        </Text>
        <Text size={14} color="secondary">
          Saldo devedor
        </Text>
      </Box>
      <Box mt={8} width="100%" justify="space-between">
        <Text color="primary" size={14} weight="bold">
          {order}
        </Text>
        <Text color="primary" size={14} weight="bold">
          {price}
        </Text>
        <Text color="primary" size={14} weight="bold">
          {debit}
        </Text>
      </Box>
    </Box>
  );
};

export default CardInstallment;
