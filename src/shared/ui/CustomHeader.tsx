import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

const searchIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0708 11.0452C8.83272 12.0344 7.26283 12.5121 5.68358 12.38C4.10433 12.2479 2.6356 11.516 1.57905 10.3348C0.522494 9.15355 -0.0416778 7.61256 0.00240131 6.02831C0.0464804 4.44407 0.695465 2.93683 1.81606 1.81617C2.93666 0.695505 4.44381 0.0464831 6.02797 0.00240144C7.61212 -0.0416802 9.15302 0.522524 10.3342 1.57914C11.5154 2.63575 12.2472 4.10456 12.3793 5.68391C12.5114 7.26325 12.0338 8.83323 11.0445 10.0714L15.7807 14.807C15.8484 14.87 15.9027 14.9461 15.9404 15.0306C15.978 15.1151 15.9983 15.2064 15.9999 15.2989C16.0015 15.3914 15.9845 15.4833 15.9499 15.5691C15.9152 15.6548 15.8636 15.7328 15.7982 15.7982C15.7328 15.8636 15.6549 15.9152 15.5691 15.9499C15.4833 15.9845 15.3914 16.0015 15.2989 15.9999C15.2064 15.9983 15.1152 15.978 15.0307 15.9404C14.9462 15.9027 14.8701 15.8484 14.807 15.7807L10.0708 11.0452ZM2.79015 9.61025C2.11595 8.93594 1.65676 8.07689 1.47062 7.14167C1.28448 6.20645 1.37974 5.23703 1.74436 4.35594C2.10898 3.47484 2.72659 2.72162 3.51915 2.19145C4.31171 1.66129 5.24363 1.37799 6.19714 1.37734C7.15065 1.3767 8.08296 1.65875 8.87623 2.18785C9.6695 2.71695 10.2881 3.46934 10.6539 4.34994C11.0197 5.23055 11.1163 6.19983 10.9314 7.1353C10.7465 8.07077 10.2885 8.93044 9.61521 9.60566L9.61062 9.61025L9.60602 9.61392C8.70131 10.5166 7.47531 11.0232 6.19733 11.0225C4.91935 11.0219 3.69389 10.5139 2.79015 9.61025Z" fill="#656762"/>
</svg>`;

export interface CustomHeaderProps {
  title: string;
  isSearch?: boolean;
  onSearchPress?: () => void; // Обработчик нажатия на поле ввода
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  isSearch = false,
  onSearchPress,
}) => {
  const textInputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus(); // Устанавливаем фокус на TextInput
    }
    if (onSearchPress) {
      onSearchPress(); // Вызываем переданный обработчик, если он есть
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Условный рендеринг заголовка */}
      {!isSearch && <Text style={styles.headerTitle}>{title}</Text>}
      {isSearch && (
        <>
          <View style={styles.searchInput} onTouchStart={handlePress}>
            <View style={styles.searchContainer}>
              <SvgXml xml={searchIcon} width={16} height={16} />
              <TextInput
                ref={textInputRef}
                placeholder="Поиск растения"
                style={styles.searchText}
              />
            </View>
          </View>
          <View style={styles.avatarContainer}></View>
        </>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 76,
    backgroundColor: "#343434",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchText: {
    flex: 1,
    color: "#9D9F9C",
    fontSize: 13,
    fontWeight: "400",
    marginLeft: 10,
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginLeft: 31,
  },
});
