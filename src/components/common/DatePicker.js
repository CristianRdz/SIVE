import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = (props) => {
  let { setSelectDate } = props;
  let { selectedDate } = props;
  let { placeholder } = props;
  const [date, setDate] = useState(selectedDate ? selectedDate : "");
  let { errorMessage } = props;

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    // da un dia de mas debemos restarle 1
    date.setDate(date.getDate() - 1);
    setDate(date.toISOString().slice(0, 10));
    setSelectDate(date.toISOString().slice(0, 10));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        value={date}
        editable={false}
        errorMessage={errorMessage}
        rightIcon={
          <Icon
            name="calendar-alt"
            type="font-awesome-5"
            size={30}
            color={date ? "black" : "#007ACC"}
            onPress={showDatePicker}
          />
        }
        onPressIn={showDatePicker}
      />
      <DateTimePickerModal
        accessibilityLanguage="es-ES"
        minimumDate={selectedDate ? new Date(selectedDate) : new Date()}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});

export default DatePicker;
