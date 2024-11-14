import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View, Animated } from 'react-native';
import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [animationValue] = useState(new Animated.Value(0)); 

  
  const playPause = () => {
    if (isPlaying) {
      sound.stop();
    } else {
      const track = new Sound('your-audio-file.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        track.play((success) => {
          if (!success) {
            console.log('Playback failed due to audio decoding errors');
          }
        });
      });
      setSound(track);
    }
    setIsPlaying(!isPlaying);
    
    Animated.spring(animationValue, {
      toValue: isPlaying ? 0.8 : 1.2,
      friction: 2,
      tension: 100,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeIn" duration={2000} style={styles.content}>
        <Text style={styles.title}>Music Player</Text>
        <Animatable.View
          animation={isPlaying ? 'bounceIn' : 'pulse'}
          iterationCount="infinite"
          direction="alternate"
          style={styles.buttonContainer}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: animationValue }] }]}>
            <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playPause} />
          </Animated.View>
        </Animatable.View>
        {isPlaying && <Text style={styles.nowPlaying}>Now Playing...</Text>}
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#1DB954', // Spotify Green
    borderRadius: 50,
    padding: 20,
  },
  nowPlaying: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default App;
