import { View, Text, TouchableOpacity } from "react-native";
import api from "../../api/axios";

const sendTest = async () => {
  try {
    const res = await api.get("/test");
    console.log("Response:", res.data);
  } catch (err) {
    console.error("Error hitting backend:", err);
  }
};

export default function OrchidListScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={sendTest}>
        <Text>Test API</Text>
      </TouchableOpacity>

      <Text>Orchid List</Text>
    </View>
  );
}
