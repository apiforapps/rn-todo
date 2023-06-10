import React, { useContext, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';

import SortDownIcon from 'assets/icons/arrow-down-short-wide-solid.svg';
import SortUpIcon from 'assets/icons/arrow-up-short-wide-solid.svg';
import statuses from 'configs/status.json';
import { Modal } from 'components';
import { TaskContext, AuthContext } from 'context';

export const TasksList = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    isLoading,
    tasks,
    count,
    page,
    sort,
    direction,
    setPage,
    setSort,
    setDirection,
    setCurrent,
    getTasks,
  } = useContext(TaskContext);
  const { token } = useContext(AuthContext);
  const pageNumbers = [];

  const renderStatus = (status) => {
    const text = statuses?.find((payload) => payload.value === status).title;
    const arr = text.split(',').map((item) => (
      <Text key={item} style={styles.status}>
        {item}
      </Text>
    ));
    return arr;
  };

  for (let i = 1; i <= Math.ceil(count / 3); i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Sorted by</Text>
        <Pressable style={styles.button} onPress={() => setShowModal(true)}>
          <Text style={[styles.label, { color: '#1C1C1C' }]}>{sort}</Text>
        </Pressable>
        <View>
          {direction === 'asc' ? (
            <Pressable onPress={() => setDirection('desc')}>
              <SortDownIcon style={styles.icon} />
            </Pressable>
          ) : (
            <Pressable onPress={() => setDirection('asc')}>
              <SortUpIcon style={styles.icon} />
            </Pressable>
          )}
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => getTasks()} />
        }
      >
        {tasks?.map((item) => (
          <Pressable
            key={item.id}
            style={styles.task}
            onPress={() =>
              token
                ? (setCurrent(item), navigation.navigate('EditTaskScreen'))
                : ''
            }
          >
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <View style={{ flexDirection: 'row' }}>
              {renderStatus(item.status)}
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {pageNumbers.map((number) => (
          <Pressable
            key={number}
            style={[styles.number, { opacity: page === number ? 1 : 0.6 }]}
            onPress={() => setPage(number)}
          >
            <Text style={{ fontWeight: page === number ? '700' : '400' }}>
              {number}
            </Text>
          </Pressable>
        ))}
      </View>
      <Modal showModal={showModal} setShowModal={() => setShowModal(false)}>
        <TouchableWithoutFeedback>
          <View style={{ marginTop: 12 }}>
            {['id', 'username', 'email', 'status'].map((item) => (
              <Pressable
                key={item}
                style={{
                  backgroundColor:
                    sort === item ? 'rgba(255, 255, 255, 0.2)' : null,
                  marginHorizontal: -12,
                }}
                onPress={() => setSort(item)}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      color: sort === item ? '#FFFFFF' : '#D9D9D9',
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2980B9',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#ECF0F1',
    minWidth: 40,
    marginHorizontal: 8,
    borderRadius: 2,
    paddingHorizontal: 4,
  },
  icon: {
    width: 18,
    height: 18,
    color: '#FFF',
  },
  task: {
    backgroundColor: '#FFF',
    marginVertical: 4,
    padding: 14,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: 700,
  },
  email: {
    color: '#979797',
  },
  text: {
    marginVertical: 14,
    fontStyle: 'italic',
  },
  status: {
    backgroundColor: '#CCC',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginRight: 4,
    textTransform: 'lowercase',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  number: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
