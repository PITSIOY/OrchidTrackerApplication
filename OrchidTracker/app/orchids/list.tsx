import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function OrchidList() {
  type Orchid = {
    id: number;
    name: string;
    image_url: string;
    price: number;
    stock: number;
    stems: number;
    pot_size: number;
  };

  const [orchids, setOrchids] = useState<Orchid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const response = await axios.get("http://192.168.31.93:5000/orchids");
        setOrchids(response.data);
      } catch (error) {
        console.error("Error fetching orchids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchids();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  return (
    <FlatList
      data={orchids}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: `http://192.168.31.93:5000/${item.image_url}` }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>🌿 {item.stems} stem(s)</Text>
            <Text style={styles.details}>🪴 {item.pot_size}cm</Text>
            <Text style={styles.details}>📦 Stock: {item.stock}</Text>
          </View>

          <Text style={styles.price}>{item.price}€</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: 100,
    height: 125,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    paddingTop: 10,
    fontSize: 14,
    color: "#666",
  },
  price: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7518",
  },
});
