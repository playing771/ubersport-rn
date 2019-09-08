import React from 'react';
import RoundButton, { IRoundButtonProps } from './RoundButton';

interface IProps extends IRoundButtonProps {}

const DEFAULT_BACKGROUNDCOLOR = '#26AE60';

const EditBtn = ({ backgroundColor = DEFAULT_BACKGROUNDCOLOR, ...props }: IProps) => {
  return <RoundButton backgroundColor={backgroundColor} icon="ios-create" {...props} />;
};

export default EditBtn;
