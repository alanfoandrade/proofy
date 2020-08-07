import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  BorderlessButton,
  RectButton,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';

import styles from './styles';

FeatherIcon.loadFont();

const TeacherList: React.FC = () => {
  const week = [
    { value: 0, label: 'Domingo' },
    { value: 1, label: 'Segunda-feira' },
    { value: 2, label: 'Terça-feira' },
    { value: 3, label: 'Quarta-feira' },
    { value: 4, label: 'Quinta-feira' },
    { value: 5, label: 'Sexta-feira' },
    { value: 6, label: 'Sábado' },
  ];

  const schedule = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState({ value: 0, label: '' });
  const [selectDayModalVisible, setSelectDayModalVisible] = useState(false);
  const [time, setTime] = useState('');
  const [selectTimeModalVisible, setSelectTimeModalVisible] = useState(false);

  const loadFavorites = useCallback(async () => {
    const response = await AsyncStorage.getItem('favorites');

    if (response) {
      const favoritesTeachers = JSON.parse(response);

      const favoritesTeachersIds = favoritesTeachers.map(
        (teacher: TeacherProps) => teacher.id,
      );
      setFavorites(favoritesTeachersIds);
    }
  }, []);

  const handleFiltersSubmit = useCallback(async () => {
    loadFavorites();

    setFiltersVisible((prevState) => !prevState);

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay.value,
        time,
      },
    });

    setTeachers(response.data);
  }, [loadFavorites, subject, weekDay.value, time]);

  const handleToggleFiltersVisible = useCallback(() => {
    setFiltersVisible((prevState) => !prevState);
  }, []);

  const handleToggleSelectDayModalVisible = useCallback(() => {
    setSelectDayModalVisible((prevState) => !prevState);
  }, []);

  const handleToggleSelectTimeModalVisible = useCallback(() => {
    setSelectTimeModalVisible((prevState) => !prevState);
  }, []);

  const handleSelectDay = useCallback(
    (value) => {
      setWeekDay(
        (prevState) => week.find((day) => day.value === value) || prevState,
      );
      setSelectDayModalVisible((prevState) => !prevState);
    },
    [week],
  );

  const handleSelectTime = useCallback(
    (value) => {
      setTime(
        (prevState) => schedule.find((hour) => hour === value) || prevState,
      );
      setSelectTimeModalVisible((prevState) => !prevState);
    },
    [schedule],
  );

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton
            style={{ flexDirection: 'row' }}
            onPress={handleToggleFiltersVisible}
          >
            <Text style={styles.filterButtonText}>Filtrar </Text>
            <FeatherIcon name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {filtersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TouchableWithoutFeedback
                  onPress={handleToggleSelectDayModalVisible}
                >
                  <TextInput
                    style={styles.input}
                    value={weekDay.label}
                    editable={false}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#c1bccc"
                  />
                </TouchableWithoutFeedback>
                <Modal
                  transparent
                  animationType="fade"
                  visible={selectDayModalVisible}
                >
                  <View style={styles.modal}>
                    <View style={styles.modalContent}>
                      <Picker
                        selectedValue={weekDay.value}
                        onValueChange={handleSelectDay}
                      >
                        <Picker.Item label="" value={0} />
                        {week.map((day) => (
                          <Picker.Item
                            key={day.value}
                            label={day.label}
                            value={day.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TouchableWithoutFeedback
                  onPress={handleToggleSelectTimeModalVisible}
                >
                  <TextInput
                    style={styles.input}
                    value={time}
                    editable={false}
                    placeholder="Qual o horário?"
                    placeholderTextColor="#c1bccc"
                  />
                </TouchableWithoutFeedback>
                <Modal
                  transparent
                  animationType="fade"
                  visible={selectTimeModalVisible}
                >
                  <View style={styles.modal}>
                    <View style={styles.modalContent}>
                      <Picker
                        selectedValue={time}
                        onValueChange={handleSelectTime}
                      >
                        <Picker.Item label="" value="" />
                        {schedule.map((hour) => (
                          <Picker.Item key={hour} label={hour} value={hour} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}
      >
        {teachers.map((teacher: TeacherProps) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
