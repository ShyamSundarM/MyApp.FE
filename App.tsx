import React from 'react';
import {StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './components/AppNavigator';
import FlashMessage from 'react-native-flash-message';

function App(): React.JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <FlashMessage position="top" style={{paddingTop: 40}} />
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
