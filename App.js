import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert, useAnimatedValue, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import MathJax from 'react-native-mathjax';
import MathInput from "react-math-keyboard";
import { WebView } from 'react-native-webview';

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




  const onMessage = (event) => {

    const latex = event.nativeEvent.data;
    const newText = text + ` ${latex} `;
    setText(newText);
    setWebViewVisible(false);






  }
  const toggleWebView = () => {
    setWebViewVisible(!webViewVisible);
  }



  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Post
      </Text>

      <TextInput
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Enter text or LaTeX"

        style={styles.input}
      />


      <Button
        title={webViewVisible ? "Hide Equation Editor" : "Show Equation Editor"}
        onPress={toggleWebView}
      />



      <MathJax
        mathJaxOptions={mmlOptions}
        html={text}
        style={styles.mathjax}
      />










      {webViewVisible && (
        <WebView
          //source={editorFile}
          //source={{ uri: 'https://math-keyboard-9ajgmhzbh-liyanjun19s-projects.vercel.app/' }}
          source={{ uri: 'http://172.25.96.1:3000/' }}

          automaticallyAdjustContentInsets={true}
          startInLoadingState={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          style={{ marginTop: 20, height: 100 }}
          onMessage={onMessage}

        />
      )}





    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  input: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  mathjax: {
    marginTop: 10,
  },
});