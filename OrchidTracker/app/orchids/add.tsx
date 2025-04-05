import React, { useState } from "react";
import { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActionSheetIOS,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import styles from "../../stylesheets/add.styles";

export default function AddOrchid() {
  const [image, setImage] = useState<string | null>(null);
  const [orchidName, setOrchidName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [stems, setStems] = useState("1");
  const [potSize, setPotSize] = useState("7");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef<ScrollView>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Δώσε Permission τελείωνε");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const showStemsPickerIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "1 Stem",
          "2 Stems",
          "3 Stems",
          "4 Stems",
          "5 Stems",
        ],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          setStems(buttonIndex.toString());
        }
      }
    );
  };

  const showPotSizePickerIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "7cm",
          "8cm",
          "9cm",
          "10cm",
          "11cm",
          "12cm",
          "13cm",
          "14cm",
          "15cm",
        ],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          setPotSize((6 + buttonIndex).toString());
        }
      }
    );
  };

  const showSuccessMessage = () => {
    setMessage("Orchid Added Succesfully!");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 700);
    });
  };

  const handleSubmit = async () => {
    if (!orchidName || !price || !stock || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", orchidName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("stems", stems);
    formData.append("pot_size", potSize);

    const imageUri = image;
    let imageName = imageUri.split("/").pop() || "orchid.heic";

    if (imageName.toLowerCase().endsWith(".heic")) {
      imageName = imageName.replace(/\.heic$/i, ".jpg");
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();

    formData.append("image", blob, imageName);

    try {
      const response = await axios.post(
        "http://192.168.31.93:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      if (response.data.message) {
        showSuccessMessage();
        setImage(null);
        setOrchidName("");
        setPrice("");
        setStock("");
        setStems("1");
        setPotSize("7");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setMessage("There was an error uploading the orchid :(");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          {/*------- Image Upload Box -------*/}
          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <>
                  <Text style={styles.imageText}>Upload Image</Text>
                  <Button title="Pick an Image" onPress={pickImage} />
                </>
              )}
            </View>

            {image && (
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={pickImage}
              >
                <Text style={styles.changeImageText}>Swap Image</Text>
              </TouchableOpacity>
            )}
          </View>

          {/*------- Text Input Fields -------*/}
          <TextInput
            style={styles.input}
            placeholder="Orchid Name"
            placeholderTextColor="#999"
            value={orchidName}
            onChangeText={setOrchidName}
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Stock"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={stock}
            onChangeText={setStock}
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
          />

          {/*------- Picker Fields -------*/}
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={Platform.OS === "ios" ? showStemsPickerIOS : undefined}
            >
              <Text style={styles.pickerButtonText}>
                {stems ? `${stems} Stems` : "Select Stems"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerButton}
              onPress={Platform.OS === "ios" ? showPotSizePickerIOS : undefined}
            >
              <Text style={styles.pickerButtonText}>
                {potSize ? `${potSize}cm Pot` : "Select Pot Size"}
              </Text>
            </TouchableOpacity>
          </View>

          {/*------- Submit Button -------*/}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Orchid</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
            <Text style={styles.messageText}>{message}</Text>
          </Animated.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
