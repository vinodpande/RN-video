import React from 'react';
import Slider from '@react-native-community/slider';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

interface Props {
  currentTime: number;
  duration: number;
  onSlideCapture: (data: {seekTime: number}) => void;
  onSlideStart: () => void;
  onSlideComplete: () => void;
}

export const ProgressBar: React.FC<Props> = ({
  currentTime,
  duration,
  onSlideCapture,
  onSlideStart,
  onSlideComplete,
}) => {
  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);

  return (
    <View style={styles.wrapper}>
      <View style={styles.timeWrapper}>
        <Text style={styles.timeLeft}>{position}</Text>
        <Text style={styles.timePipe}>/</Text>
        <Text style={styles.timeRight}>{fullDuration}</Text>
      </View>
      <Slider
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        step={1}
        onValueChange={handleOnSlide}
        onSlidingStart={onSlideStart}
        onSlidingComplete={onSlideComplete}
        minimumTrackTintColor={'#F44336'}
        maximumTrackTintColor={'#FFFFFF'}
        thumbTintColor={'#F44336'}
      />
    </View>
  );

  function getMinutesFromSeconds(time: number) {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);

    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  }

  function handleOnSlide(time: number) {
    onSlideCapture({seekTime: time});
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  timeWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  timeLeft: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingLeft: 10,
  },
  timePipe: {
    paddingLeft: 4,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
    paddingRight: 4,
  },
  timeRight: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right',
    paddingRight: 10,
  },
});
