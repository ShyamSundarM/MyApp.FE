import React, {useState, useEffect} from 'react';
import {View, StyleSheet, useWindowDimensions, Animated} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Login from './Login';
import Register from './Register';
import {useAuthStore} from '../state/store';

const renderScene = SceneMap({
  login: Login,
  register: Register,
});

export default function Auth() {
  const layout = useWindowDimensions();
  const {currentTab, setCurrentTab} = useAuthStore();
  const [routes] = useState([
    {key: 'login', title: 'Login'},
    {key: 'register', title: 'Register'},
  ]);

  const animatedHeight = useState(new Animated.Value(400))[0];

  useEffect(() => {
    let targetHeight = currentTab === 0 ? 400 : 600; // Login: 400, Register: 600
    Animated.timing(animatedHeight, {
      toValue: targetHeight,
      duration: 300, // Animation duration in milliseconds
      useNativeDriver: false,
    }).start();
  }, [currentTab]);

  return (
    <View style={styles.outerContainer}>
      <Animated.View style={[styles.innerContainer, {height: animatedHeight}]}>
        {/* Animated height */}
        <TabView
          navigationState={{index: currentTab, routes}}
          renderScene={renderScene}
          onIndexChange={setCurrentTab}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={styles.tabBar}
              indicatorStyle={styles.indicator}
              tabStyle={{}}
            />
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#b6b6b6',
  },
  innerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
  },
  tabBar: {
    backgroundColor: '#6200ee',
  },
  indicator: {
    backgroundColor: '#ffa7a7',
    height: 4,
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
  },
});
