import { Link, Redirect } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Redirect href={"/welcome"} />;
  }
  return (
    <SafeAreaView>
      <Text className='text-xl font-bold text-blue-500'>
        Edit app/index.tsx to edit this screen.
        <Link href="/(auth)/welcome">Click</Link>
      </Text>
    </SafeAreaView>
  );
}


// our auth redirect will be here, redirects user to certain page depending on auth level
// also status bar theme will be here and theme import