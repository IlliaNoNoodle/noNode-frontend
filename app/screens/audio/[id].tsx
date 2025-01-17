import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { audios } from '../../store';

import CardRow from '@/components/CardRow';
import QuickAction from '@/components/QuickAction';
import Reasoning from '@/components/Reasoning';
import CallSummary from '@/components/CallSummary';
import AudioHeader from '@/components/AudioHeader';
import AudioControls from '@/components/AudioControls';
import RedFlags from '@/components/RedFlags';
import KeyQuotes from '@/components/KeyQuotes';
import IndividualContributions from '@/components/IndividualContributions';
import Disclaimers from '@/components/Disclaimers';

export default function LectureRecording() {
  const { id } = useLocalSearchParams();
console.log('ID from useLocalSearchParams:', id);
  const [allAudios] = useAtom(audios);
  console.log('All audios:', allAudios);


  const redFlagDetails = [
    {
      title: 'Harassment',
      description: 'Language used ("constant nagging," "always do this") could be perceived as harassing or belittling.',
      timestamp: '00:05:10',
    },
    {
      title: 'Potential Retaliation',
      description:
        'The manager hinted at negative performance review consequences if the employee "continued this attitude," which may be interpreted as a threat or retaliation.',
      timestamp: '00:05:10',
    },
  ];

  const keyQuotes = [
    {
      text: 'You always do this...!',
      context: 'The manager expressed frustration with repeated delays, using absolute terms ("always") which can trigger defensiveness.',
      person: 'Person 1',
      timestamp: '00:03:45',
    },
    {
      text: "I'm honestly getting fed up with your constant nagging.",
      context: 'The employee felt unfairly targeted, escalating the situation with accusatory wording.',
      person: 'Person 2',
      timestamp: '00:03:45',
    },
  ];

  const contributions = [
    {
      person: 'Person 1',
      comments: 'Emphasized missed deadlines and unresponsiveness from the team, used strong language (“You always ignore me”).',
      tone: 'Frustrated, repeatedly cutting off the employee; borderline aggressive.',
      observations: 'Could escalate to a formal HR issue if this style of communication persists.',
    },
    {
      person: 'Person 2',
      comments: 'Expressed feeling singled out and unsupported. Claimed the manager’s expectations are unclear.',
      tone: 'Defensive and visibly upset; raised their voice in response to the manager’s criticisms.',
      observations: 'Potential conflict with the manager could impact team morale if not resolved.',
    },
  ];

  const recording = allAudios.find(audio => audio.id === Number(id));
  console.log('Recording:', recording);
  if (!recording) {
    return (
      <View style={styles.centered}>
        <Text>Recording not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AudioHeader title={recording.name} />
      <ScrollView contentContainerStyle={styles.content}>
        <CardRow />
        <QuickAction />
        <Reasoning />
        <CallSummary />
        <RedFlags details={redFlagDetails} />
        <KeyQuotes quotes={keyQuotes} />
        <IndividualContributions contributions={contributions} />
        <Disclaimers id={recording.id} />
      </ScrollView>
      <AudioControls audioUrl={recording.uri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 120,
  },
});