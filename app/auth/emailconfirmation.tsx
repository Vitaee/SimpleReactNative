import EmailConfirmationScreen from '@/src/screens/auth/ConfirmEmail';
import { useLocalSearchParams } from 'expo-router';

export default function EmailConfirmationRoute() {
    const { email } = useLocalSearchParams<{ email: string }>();
    return <EmailConfirmationScreen email={email!.toString()} />;
}