import { Redirect } from 'expo-router';

export default function Index() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Redirect href={"/welcome"} />;
  }
  return (
    <></>
  );
}


// our auth redirect will be here, redirects user to certain page depending on auth level
// also status bar theme will be here and theme import