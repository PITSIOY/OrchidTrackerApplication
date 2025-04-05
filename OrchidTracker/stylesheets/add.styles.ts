import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  form: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 30,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: 300,
    marginTop: 35,
    height: 270,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  imageText: {
    color: "#999",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  changeImageButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  changeImageText: {
    color: "#fff",
    fontSize: 14,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    color: "#000",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
  },
  pickerButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#ff7518",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "85%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageBox: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
  messageText: {
    backgroundColor: "rgba(0, 128, 0, 0.9)",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
