import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";

export const CalendarScreen = () => {
  const [selected, setSelected] = useState("");
  const [allDaysMarked, setAllDaysMarked] = useState([]);

  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  const quantityDaysInMonth = daysInMonth(2024, 6);

  const today = new Date();
  console.log(today);
  const todayString = dayjs(today).format("YYYY-MM-DD").toString();

  console.log("today string");
  console.log(todayString);

  type MarkedDay = { [date: string]: any }; // Define um tipo para os itens do array

  // Exemplo de estrutura do array, certifique-se de que este array não esteja sendo declarado duas vezes
  const exampleDaysMarked: MarkedDay[] = [
    { "2024-06-06": { event: "Aniversário" } },
    { "2024-06-07": { event: "Reunião" } },
    // Adicione outros itens conforme necessário
  ];

  const markedDatesObject: { [date: string]: any } = exampleDaysMarked.reduce(
    (acc: { [date: string]: any }, item: MarkedDay) => {
      const dateKey = Object.keys(item)[0]; // Obtém a chave da data
      acc[dateKey] = item[dateKey]; // Adiciona ao objeto resultante
      return acc;
    },
    {}
  );

  console.log(markedDatesObject);

  return (
    <View
      style={{
        padding: 25,
        alignItems: "center",
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "gray",
      }}
    >
      <Calendar
        markingType={"dot"}
        markedDates={markedDatesObject}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        style={
          {
            /*  height: 350,
          width: "100%", */
            //margin: 10
          }
        }
        theme={{
          "stylesheet.day.basic": {
            base: {
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            },
          },
          arrowStyle: {
            backgroundColor: Colors.primary,
            color: "#fff",
            borderTopLeftRadius: 5,
            borderBottomRightRadius: 5,
            height: 16,
            width: 16,
            justifyContent: "center",
            alignItems: "center",
          },
          arrowWidth: 16,
          arrowHeight: 16,
          arrowColor: "#fff",
          header: {
            margin: 20,
            width: "40%",
          },
          backgroundColor: "#000",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#000",
          selectedDayBackgroundColor: Colors.lightPink,
          selectedDayTextColor: "#ffffff",
          todayTextColor: Colors.lightPink,
          textDisabledColor: "#eee",
          selectedDayRadius: 5,
          textMonthFontFamily: "Lexend SemiBold",
          monthTextColor: "#404040",
          textMonthFontSize: 16,
          textDayHeaderFontFamily: "Lexend Medium",
          textDayHeaderFontSize: 12,
          textDayHeaderColor: "#000",
          textDayFontFamily: "Lexend Medium",
          textDayFontSize: 12,
          margin: 8,
          todayTextColor: "#fff",
          textDayStyle: {
            color: "#404040",
          },
          headerContainer: {
            backgroundColor: "#eee",
            borderRadius: 12,
            margin: 20,
            //width: '40%'
          },
        }}
      />
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: Colors.primary,
            padding: 15,
            borderRadius: 999,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        >
          <Feather name="plus" size={22} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});
