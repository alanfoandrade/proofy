import React, { useCallback } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const handleNavigatetoGiveClassesPage = useCallback(() => {
    navigate('GiveClasses');
  }, [navigate]);

  const handleNavigatetoStudyPage = useCallback(() => {
    navigate('Study');
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigatetoStudyPage}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigatetoGiveClassesPage}
        >
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        {/* eslint-disable-next-line prettier/prettier */}
        Total de 285 conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
