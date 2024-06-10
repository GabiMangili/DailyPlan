import { extend } from "dayjs";
import { Colors } from "../styles/colors";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type ColorsType = keyof typeof Colors;

export interface InputProps extends TextInputProps {
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  label: string;
  placeholder: string;
  required?: boolean;
}

export interface InputDefaultProps extends InputProps {
  suffixIcon?: JSX.Element;
  onPressIcon?: Function;
}

export interface CheckBox extends InputProps {
  selected: boolean;
  color: ColorsType;
}

export interface SelectInput extends InputProps {
  dataList: { id: number; description: number };
  onOpen: Function;
  onClose: Function;
  onSelect: Function;
}

export interface QuantityInput extends InputProps {
  maxQuantity: number;
  minQuantity: number;
}

export interface ButtonCustomProps extends TouchableOpacityProps {
  children?: ReactNode;
  color?: ColorsType;
  disabled?: boolean;
}

export interface IconButtonCustomProps extends ButtonCustomProps {
  icon: JSX.Element;
  variant: "contained" | "outlined";
  isRounded?: boolean;
}

export interface TouchableCustomProps extends TouchableOpacityProps {
  children: ReactNode;
}

export interface HeaderCustomProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  onPressIconLeft?: Function;
  onPressIconRight?: Function;
  bottom?: ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
}
