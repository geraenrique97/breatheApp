import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {commons} from '../../../styles';
import {formatTimeToMMSS} from '../../../utils';
import {BreathAnimated} from '../../BreathAnimated';
import {Button} from '../../Button/Index';
import {Typography} from '../../Typography';

const SECONDS_BY_MINUTE = 60;
const MILISECONDS = 1000;
const STEP_INHALE = 'Inhale';
const STEP_EXALE = 'Exale';
const DEFAULT_CONFIG = {
  time: 1 * SECONDS_BY_MINUTE,
  selectedOption: 1,
};

export const Breathe = () => {
  const [breath, setBreathe] = useState(false);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [step, setStep] = useState('start');
  const [time, setTime] = useState(1 * SECONDS_BY_MINUTE);
  const timer = useRef(null);

  const handleOnStart = () => {
    setBreathe(current => !current);
  };

  const handleOnChangeConfig = newConfig => {
    setBreathe(false);
    setConfig({
      time: newConfig.time * SECONDS_BY_MINUTE,
      selectedOption: newConfig.option,
    });
    setTime(newConfig.time * SECONDS_BY_MINUTE);
    setStep('');
  };

  useEffect(() => {
    if (breath) {
      timer.current = setInterval(() => {
        setTime(current => current - 1);
      }, MILISECONDS);
    }

    return () => clearInterval(timer.current);
  }, [breath]);

  useEffect(() => {
    setTime(config.time);
  }, [config]);

  useEffect(() => {
    if (breath) {
      if (time === config.time) {
        setStep(STEP_INHALE);
      }

      if (time === config.time / 2) {
        setStep(STEP_EXALE);
      }

      if (time === 0) {
        clearInterval(timer.current);
        setStep('');
        setBreathe(false);
      }
    }
  }, [breath, time, config.time]);

  const styles = {
    timer: {margin: 58, opacity: 0, ...(breath && {opacity: 1})},
    playPauseButton: {marginBottom: 90},
    subtitle: {
      ...commons.boxSize(50, 50),
      opacity: 0,
      ...(breath && {opacity: 1}),
    },
    actions: {flexDirection: 'row'},
  };

  const effect =
    step === STEP_INHALE ? 'grow' : step === STEP_EXALE ? 'shrink' : '';

  return (
    <ImageBackground
      source={require('../../Images/gradient.png')}
      resizeMode="cover"
      style={[commons.fillAvailableSpace, commons.centeredLayout]}>
      <SafeAreaView>
        <View style={commons.centeredLayout}>
          <Typography type="title"> Breathe & relax </Typography>
          <Typography type="subtitle" style={styles.subtitle}>
            {step ? step : ''}
          </Typography>
          <BreathAnimated
            theme={breath ? 'light' : 'dark'}
            effect={effect}
            time={(config.time / 2) * MILISECONDS}
          />
          <Typography type="body" style={styles.timer}>
            {formatTimeToMMSS(time)}
          </Typography>
          <TouchableOpacity
            onPress={handleOnStart}
            style={styles.playPauseButton}>
            <Image
              resizeMode="cover"
              style={commons.boxSize(50, 50)}
              source={
                breath
                  ? require('../../Images/pauseIcon.png')
                  : require('../../Images/playIcon.png')
              }
            />
          </TouchableOpacity>
          <View style={styles.actions}>
            <Button
              selected={config.selectedOption === 1}
              onPress={() => handleOnChangeConfig({time: 1, option: 1})}
              label="1 min"
            />
            <Button
              selected={config.selectedOption === 2}
              onPress={() => handleOnChangeConfig({time: 2, option: 2})}
              label="2 min"
            />
            <Button
              selected={config.selectedOption === 3}
              onPress={() => handleOnChangeConfig({time: 3, option: 3})}
              label="3 min"
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
