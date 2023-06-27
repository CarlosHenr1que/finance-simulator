import React from "react";

import Text from "../../common/Text";
import Box from "../../common/Box";

import ReAnimated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

interface CardInformationProps {
  icon: any;
  title: string;
  description: string;
  iconBackground: string;
}

export const CardInformation = ({
  icon,
  title,
  description,
  iconBackground,
}: CardInformationProps) => (
  <ReAnimated.View
    style={{ width: "100%" }}
    layout={Layout}
    entering={FadeInLeft.duration(1000)}
    exiting={FadeOutLeft.duration(100)}
  >
    <Box
      dir="row"
      background="#fff"
      width="100%"
      py={8}
      px={8}
      radius={8}
      align="center"
    >
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
        <Text weight="bold" size={18}>
          {title}
        </Text>
        <Text color="secondary" size={14}>
          {description}
        </Text>
      </Box>
    </Box>
  </ReAnimated.View>
);
