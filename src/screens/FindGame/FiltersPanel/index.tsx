import * as React from "react";
import { View, StyleSheet } from "react-native";
import FilterButton from "./FilterButton";
import SortModal from "./sortModal";
import { ISearchGameSort } from "../../FindGame";

import { AppContext } from "../../../other/context/sports";
import withModal from "../../../components/hocs/WithModal";
import { withNavigation, NavigationInjectedProps } from "react-navigation";
import { NavigationRoot } from "../../../navigation/roots";
import withAppContext from "../../../components/hocs/WithAppContext";

const sortValues: { [key in ISearchGameSort]: string } = {
  date: "Новые",
  distance: "Ближайшие",
  time: "Скоро начало"
};

interface IProps extends NavigationInjectedProps {
  activeSort: ISearchGameSort;
  onChangeActiveSort: (sort: ISearchGameSort, toggleModal: () => void) => void;
  ctx?: AppContext;
}

interface IState {}

const FilterButtonWithModal = withModal(FilterButton);

@withAppContext
class FiltersPanel extends React.Component<IProps, IState> {
  public render() {
    return (
      <View style={styles.container}>
        <FilterButton
          style={styles.buttonLeft}
          title="Спорт"
          value="2 вида"
          // modalStyle={{}}
          onPress={() => {
            this.props.navigation.navigate(NavigationRoot.SportFilters);
          }}
          // modal={({ toggleModal }) => (
          //   <SportsModal
          //     favoriteSports={this.props.ctx!.user.favoriteSports}
          //   />
          // )}
        />
        <FilterButtonWithModal
          wrapperStyle={styles.buttonRight}
          title="Сортировка"
          value={sortValues[this.props.activeSort]}
          modal={({ toggleModal }) => (
            <SortModal
              activeSort={this.props.activeSort}
              onChange={sort =>
                this.props.onChangeActiveSort(sort, toggleModal)
              }
            />
          )}
        />
        {/* <UButton
          icon="ios-options"
          style={{ width: 60, backgroundColor: 'transparent' }}
          iconSize={22}
          iconColor="#dcdcdc"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    marginTop: 10
  },
  buttonLeft: { flex: 1, alignItems: "flex-start", paddingLeft: 12 },
  buttonRight: { flex: 1, alignItems: "flex-end", paddingRight: 12 }
});

export default withNavigation(FiltersPanel);
