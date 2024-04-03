import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect, Component } from "react";
import MathJax from "react-native-mathjax";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { WebView } from "react-native-webview";

const mmlOptions = {
  messageStyle: "none",
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      "AMSmath.js",
      "AMSsymbols.js",
      "noErrors.js",
      "noUndefined.js",
    ],
  },
};

export default function App() {
  //const [latex, setLatex] = useState("");
  const [text, setText] = useState("");
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [postReviewVisible, setPostReviewVisible] = useState(false);

  const onMessage = (event) => {
    const latex = event.nativeEvent.data;
    const newText = text + ` ${latex} `;
    setText(newText);
    setWebViewVisible(false);
  };
  const toggleWebView = () => {
    setWebViewVisible(!webViewVisible);
  };

  const togglePostReview = () => {
    setPostReviewVisible(!postReviewVisible);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Post</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Switch
            title={postReviewVisible ? "Hide Post Review" : "Show Post Review"}
            onValueChange={togglePostReview}
            value={postReviewVisible}
          />
          <Text>Review On</Text>
        </View>
      </View>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          fontSize: 18,
          borderRadius: 10,
          width: "100%",
          height: 100,
          alignItems: "stretch",
        }}
        multiline={true}
        value={text}
        onChangeText={setText}
        placeholder="Enter text or LaTeX"
      />
      <View style={{ marginVertical: 3 }}></View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 12,

            backgroundColor: "#1aa7ec",
          }}
        >
          <MaterialIcon name="add-a-photo" size={30} color="#fdfdfd" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 12,
            backgroundColor: "#1aa7ec",
          }}
          onPress={toggleWebView}
        >
          <MaterialIcon name="functions" size={30} color="#fdfdfd" />
        </TouchableOpacity>

        <View style={{ width: 60 }} />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 12,

            backgroundColor: "#1aa7ec",
            width: "40%",
          }}
        >
          <Text
            style={{
              color: "#fdfdfd",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Create Post
          </Text>
        </TouchableOpacity>
      </View>

      {postReviewVisible && (
        <MathJax
          mathJaxOptions={mmlOptions}
          html={text.replace(/\n/g, "<br />")}
          style={styles.mathjax}
        />
      )}

      <Modal visible={webViewVisible}>
        <MaterialIcon name="close" size={24} onPress={toggleWebView} />
        <WebView
          //source={editorFile}
          //source={{ uri: 'https://math-keyboard-9ajgmhzbh-liyanjun19s-projects.vercel.app/' }}

          source={{ uri: "http://172.30.176.1:3000 " }}
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
          style={{ marginTop: 20, height: 100 }}
          onMessage={onMessage}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  mathjax: {
    marginTop: 10,
  },
});
