import * as React from "react";

import { ExpanderProps } from "./ExpandedExample";
import { Button } from "react-native";
interface ExpanderComponentProps extends ExpanderProps {
  title: string;
}

export class ExpanderComponent extends React.Component<ExpanderComponentProps> {
  render() {
    const { isExpanded, toggleExpanded, title, children } = this.props;
    return (
      <>
        <Button onPress={toggleExpanded} title={title} />
        {isExpanded && children}
      </>
    );
  }
}
