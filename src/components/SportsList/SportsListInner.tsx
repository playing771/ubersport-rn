import React, { useState } from 'react';
import ISport from '../../api/sports/Sport.type';
import { ISportsListProps } from '.';

import SportsListView from './SportsListView';

interface IProps extends Omit<ISportsListProps, 'exclude'> {
  sports: ISport[];
  loading?: boolean;
}

export default function SportsListInner({
  onChange,
  // exclude = [],
  initialValues = [],
  ...props
}: IProps) {
  const [innerSelectedSports, setInnerSelectedSports] = useState<number[]>(initialValues);

  const onChangeHandle = (selectedId: number) => {
    const itemIndex = innerSelectedSports.findIndex(sel => sel === selectedId);
    if (itemIndex > -1) {
      innerSelectedSports.splice(itemIndex, 1);
    } else {
      innerSelectedSports.push(selectedId);
    }

    setInnerSelectedSports([...innerSelectedSports]);

    if (onChange) {
      onChange(innerSelectedSports);
    }
  };

  return (
    <SportsListView
      {...props}
      onChangeHandle={onChangeHandle}
      selectedSports={innerSelectedSports}
    />
  );
}
