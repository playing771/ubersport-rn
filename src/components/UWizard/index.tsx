import React, { createRef } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { deepCopy } from '../../utils/helpers';
import { BOTTOM_BIG_NOTCH } from '../AdaptiveScreen/index';
import UWizardItem from './Item';
import { ISocialAuth } from '../../screens/SignInScreen';

export interface IUWizardStep {
  active: any;
  index: number;
  passed?: any;
  validateFn?: (data: any, prevData: any) => boolean;
}

type IUWizardStepOmitIndex = Omit<IUWizardStep, 'index'>;
type ExternalAuthType = 'LOGIN' | 'REGISTER';
export interface IActiveStepInjectedProps {
  onSubmit: (index: number, data?: any) => void;
  onSkip?: (data: ISocialAuth) => void;
  index: number;
  prevData?: any;
}

export interface IPassedStepInjectedProps {
  toggleActiveStep: (stepIndex: number) => void;
  data: any;
  nextPassed: boolean;
  index: number;
}

interface IProps {
  steps: IUWizardStepOmitIndex[];
  submitHandle: (result: { [key: number]: any }, mutate: (mutation: any) => Promise<any>) => void;
  // header: string | ReactNode;
  onStepPass?: (stepIndex: number, data: any) => void;
  style?: StyleProp<ViewStyle>;
  setPassed: (passed: number[]) => void;
  skipAndLogin: (data: any) => void;
}

interface IState {
  passed: number[]; // индексs пройденных step
  stepsDataMap: { [key: number]: any }; // данные степа (индекс в массиве равен индексу степа)
  offset: number;
}

export default class UWizard extends React.Component<IProps, IState> {
  state: IState = { passed: [], stepsDataMap: {}, offset: 0 };

  listRef: any = createRef();

  submitHandle = (mutate: (mutation: any) => Promise<any>) => {
    this.props.submitHandle(this.state.stepsDataMap, mutate);
  };

  private renderItem = ({ item }: { item: IUWizardStep }) => {
    if (this.state.passed.includes(item.index)) {
      return this.renderPassedItem(item);
    } else {
      return this.renderActiveItem(item);
    }
  };
  handleSkip = (data: ISocialAuth) => {
    this.props.skipAndLogin(data);
  };
  private renderActiveItem = (item: IUWizardStep) => {
    const ActiveItemComponent = item.active; // TODO: typings!

    return this.state.passed.includes(item.index - 1) ||
      (!this.state.passed.length && item.index === 0) ? (
      <UWizardItem
        toggleActiveStep={this.toggleActiveStep}
        index={item.index}
        withControls={true}
        isLast={item.index === this.props.steps.length - 1}
        completeWizardHandle={this.submitHandle}
        disabledControls={
          item.validateFn
            ? !item.validateFn(
                this.state.stepsDataMap[item.index],
                this.state.stepsDataMap[item.index - 1]
              )
            : undefined
        }
      >
        <ActiveItemComponent
          index={item.index}
          data={this.state.stepsDataMap}
          prevData={this.state.stepsDataMap[item.index - 1]}
          onSubmit={this.handleSaveData}
          onSkip={this.handleSkip}
        />
      </UWizardItem>
    ) : null;
  };

  private renderPassedItem = (item: IUWizardStep) => {
    const PassedItemComponent = item.passed; // TODO: typings!

    return typeof item.passed !== 'undefined' ? (
      <UWizardItem
        toggleActiveStep={this.toggleActiveStep}
        index={item.index}
        // completeWizardHandle={this.props.submitHandle}
      >
        <PassedItemComponent
          data={this.state.stepsDataMap[item.index]}
          nextPassed={this.state.passed.includes(item.index + 1)}
          index={item.index}
          toggleActiveStep={this.toggleActiveStep}
          onSubmit={this.handleSaveData}
        />
      </UWizardItem>
    ) : null;
  };

  toggleActiveStep = (stepIndex: number) => {
    console.log('stepIndex ', stepIndex);

    // если степ уже активен, убираем все степы после него
    // иначе добавляем степ с данным индексом

    let _passed = [...this.state.passed];
    if (_passed.includes(stepIndex)) {
      _passed = _passed.slice(0, stepIndex);
    } else {
      _passed.push(stepIndex);
    }
    this.setState({ passed: _passed }, () => {
      if (this.props.onStepPass) {
        this.props.onStepPass(stepIndex, this.state.stepsDataMap[stepIndex]);
        this.props.setPassed(this.state.passed);
      }
      setTimeout(() => {
        if (this.listRef) {
          this.listRef.scrollToOffset({
            offset: this.state.offset,
          });
          // (this.listRef as any).props.sfs(1);
          // this.listRef.current.scrollToOffset({ offset: 400 });
        }
      }, 50);
    });
  };

  handleSaveData = (stepIndex: number, data?: any) => {
    const stepsDataMap = deepCopy(this.state.stepsDataMap);
    stepsDataMap[stepIndex] = data;
    this.setState({ stepsDataMap });
  };

  public render() {
    return (
      <FlatList
        ref={ref => {
          this.listRef = ref;
        }}
        keyboardShouldPersistTaps={true}
        // extraScrollHeight={160}
        contentContainerStyle={[
          styles.mainContainer,
          this.props.style,
          isIphoneX() ? { paddingBottom: BOTTOM_BIG_NOTCH } : undefined,
        ]}
        style={styles.listContainer}
        data={addIndexes(this.props.steps)}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        onLayout={e => {
          const height = e.nativeEvent.layout.height;

          this.setState({ offset: height });
        }}
      />
    );
  }
}

function addIndexes(steps: IUWizardStepOmitIndex[]): IUWizardStep[] {
  return steps.map((step: IUWizardStepOmitIndex, index: number) => {
    return { ...step, index };
  });
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  headerContainer: {
    // borderBottomColor: '#141720',
    // borderBottomWidth: 2,
    backgroundColor: '#505B77',
  },
  header: {
    color: 'white',
    paddingVertical: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: { paddingTop: 24, paddingHorizontal: 24 },
});
