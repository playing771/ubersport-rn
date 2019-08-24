import React from 'react';
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  Route,
  SceneRendererProps,
} from 'react-native-tab-view';
import { Text, Dimensions, StyleSheet } from 'react-native';

interface IProps<T extends Route> {
  currentNavState: NavigationState<T>;
  onIndexChange: (index: number) => void;
  scenes: {
    [key: string]: React.ComponentType;
  };
}

export default function UTabsView<T extends Route>({
  currentNavState,
  scenes,
  onIndexChange,
}: IProps<T>) {
  return (
    <TabView
      navigationState={currentNavState}
      renderScene={SceneMap(scenes)}
      renderTabBar={renderTabBar}
      onIndexChange={onIndexChange}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
}

function renderTabBar<T extends Route>(
  props: SceneRendererProps & {
    navigationState: NavigationState<T>;
  }
) {
  return (
    <TabBar
      {...props}
      style={styles.tabBar}
      contentContainerStyle={styles.tabContent}
      indicatorStyle={styles.tabIndicator}
      renderLabel={({ route }) => {
        return <Text style={styles.labelText}>{route.title}</Text>;
      }}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: 'white' },
  tabContent: { height: 40, alignItems: 'center' },
  tabIndicator: { backgroundColor: '#71B9BB' },
  labelText: { color: '#71B9BB', fontWeight: '600' },
});
