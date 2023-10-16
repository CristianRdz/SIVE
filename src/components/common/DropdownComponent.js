import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';
import { Icon } from 'react-native-elements';
  const DropdownComponent = (props) => {
    const {colors} = useTheme();
    let { data, setValueOut, selectedValue, id, nombre, icon , typeElement} = props;
    selectedValue = selectedValue || null;
    const [value, setValue] = useState(selectedValue);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[{... styles.label, backgroundColor: colors.background, color: isFocus ? colors.primary : colors.secondary}]}>
            {isFocus ? 'Selecciona un elemento' : 'Elemento seleccionado'}
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: colors.primary }]}
          placeholderStyle={{...styles.placeholderStyle, color: colors.primary}}
          selectedTextStyle={{...styles.selectedTextStyle, color: colors.primary}}
          inputSearchStyle={{...styles.inputSearchStyle, color: colors.primary}}
          itemTextStyle={{color: colors.primary}}
          containerStyle={{...styles.containerStyle, backgroundColor: colors.background}}
          iconStyle={{...styles.iconStyle, color: colors.primary, backgroundColor: colors.background}}
          data={data}
          search
          maxHeight={300}
          labelField={nombre}
          valueField={id}
          placeholder={!isFocus ? 'Selecciona un elemento' : ''}
          searchPlaceholder="Buscar"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValueOut(item);
            setValue(item);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon 
              name="compare"
              type="material-community"
              size={20}
              color={value ? colors.primary : colors.secondary}
              containerStyle={styles.icon}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });