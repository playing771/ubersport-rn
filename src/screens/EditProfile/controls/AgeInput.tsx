import React, { useState } from 'react';
import { DatePickerIOS, StyleSheet, Text, View } from 'react-native';
import { withModal } from '../../../components/hocs/WithModal';
import withTouch from '../../../components/hocs/WIthTouch';
import { useAndroidDatePicker } from '../../../components/pickers/useAndroidDatePicker';
import UModal from '../../../components/UModal';
import { getFormattedDate } from '../../../utils/dateUtils';
import { isIOS } from '../../../utils/deviceInfo';
import { Callback } from '../../../utils/types';

interface IProps {
  // currentDate: number | undefined;
  initialDate?: number;
  changeDateHandle: Callback<number>;
}

const BIRTHDAY_DATE_FORMAT = 'DD MMMM YYYY';

// FIXME: теряется typings children у withModal

const TouchableView = withTouch(View);
const ModalableView = withModal(TouchableView);

export function ProfileAgeInput({ initialDate, changeDateHandle }: IProps) {
  const [date, setDate] = useState(initialDate ? new Date(initialDate) : undefined);

  function birthdayLabelAndroidPressHandle() {
    useAndroidDatePicker(
      date,
      newDate => {
        setDate(newDate);
        changeDateHandle(+newDate);
      },
      new Date()
    );
  }

  function onChange(newDate: Date) {
    setDate(newDate);
    changeDateHandle(+newDate);
  }

  return isIOS ? (
    <ModalableView modal={() => <ModalContent date={date} onChange={onChange} />}>
      <Text style={styles.label}>Дата рождения</Text>
      <Text>{date ? getFormattedDate(+date, BIRTHDAY_DATE_FORMAT) : 'Не указано'}</Text>
    </ModalableView>
  ) : (
    <TouchableView onPress={birthdayLabelAndroidPressHandle}>
      <Text style={styles.label}>Дата рождения</Text>
      <Text>{date ? getFormattedDate(+date, BIRTHDAY_DATE_FORMAT) : 'Не указано'}</Text>
    </TouchableView>
  );
}

function ModalContent({ date, onChange }: { date: Date | undefined; onChange: Callback<Date> }) {
  return (
    <UModal>
      <Text style={styles.header}>Укажите дату</Text>
      <DatePickerIOS
        locale="ru"
        date={date ? date : new Date()}
        onDateChange={onChange}
        mode="date"
        maximumDate={new Date()}
      />
    </UModal>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 24,
    paddingBottom: 12,
    color: '#404F7A',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    color: '#667286',
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
