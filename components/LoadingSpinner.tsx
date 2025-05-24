import {Spinner} from '@ui-kitten/components';
import {ImageProps, StyleSheet, View} from 'react-native';

export const LoadingSpinner = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
