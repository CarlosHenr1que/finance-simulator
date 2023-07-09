import React from "react";

import Text from "../../common/Text";
import Box from "../../common/Box";

import ReAnimated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

interface Item {
  title: string;
  description: string;
}
interface CardInformationProps {
  icon: any;
  title: string;
  description: string;
  iconBackground: string;
  items?: Item[];
}

export const CardInformation = ({
  icon,
  title,
  description,
  iconBackground,
  items,
}: CardInformationProps) => (
  <ReAnimated.View
    style={{ width: "100%" }}
    layout={Layout}
    entering={FadeInLeft.duration(1000)}
    exiting={FadeOutLeft.duration(100)}
  >
    <Box
      dir="column"
      background="secondary"
      width="100%"
      py={8}
      px={8}
      radius={8}
    >
      <Box dir="row" align="center">
        <Box
          width={30}
          height={30}
          background={iconBackground}
          radius={30}
          mr={8}
          justify="center"
          align="center"
        >
          {icon}
        </Box>
        <Box dir="column">
          <Text color="primary" weight="bold" size={18}>
            {title}
          </Text>
          <Text color="secondary" size={14}>
            {description}
          </Text>
        </Box>
      </Box>
      <Box justify="space-between" align="center" mt={10} px={8}>
        {items?.map((item) => (
          <Box dir="column">
            <Text color="primary" weight="bold" size={16}>
              {item.title}
            </Text>
            <Text color="secondary" size={14}>
              {item.description}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  </ReAnimated.View>
);
