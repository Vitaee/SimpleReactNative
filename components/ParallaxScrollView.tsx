import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/ThemedView';

const ITEM_WIDTH = 100; // Adjust based on your item width
const HEADER_HEIGHT = 200; // Adjust based on your header height

type Props = PropsWithChildren<{
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  horizontal?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  style,
  contentContainerStyle,
  horizontal = false,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollValue = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollValue.value = horizontal ? event.contentOffset.x : event.contentOffset.y;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = horizontal
      ? [-ITEM_WIDTH, 0, ITEM_WIDTH]
      : [-HEADER_HEIGHT, 0, HEADER_HEIGHT];

    const outputRangeTranslate = horizontal
      ? [-ITEM_WIDTH / 2, 0, ITEM_WIDTH * 0.75]
      : [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75];

    return {
      transform: horizontal
        ? [
            {
              translateX: interpolate(
                scrollValue.value,
                inputRange,
                outputRangeTranslate
              ),
            },
            {
              scale: interpolate(
                scrollValue.value,
                inputRange,
                [2, 1, 1]
              ),
            },
          ]
        : [
            {
              translateY: interpolate(
                scrollValue.value,
                inputRange,
                outputRangeTranslate
              ),
            },
            {
              scale: interpolate(
                scrollValue.value,
                inputRange,
                [2, 1, 1]
              ),
            },
          ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      horizontal={horizontal}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={[style]}
      contentContainerStyle={[
        horizontal ? styles.horizontalContent : styles.verticalContent,
        contentContainerStyle,
      ]}
    >
      <Animated.View style={horizontal ? styles.horizontalContent : styles.verticalContent}>
        {children}
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  verticalContent: {
    flexGrow: 1,
  },
  horizontalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});