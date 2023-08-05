import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from './Auth'
import Account from './Account'
import { View, Button } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreenNavigationProp } from '../types';

type Props = {
    navigation: LandingScreenNavigationProp;
};

export default function LandingScreen({ navigation }: Props) {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <View>
            {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
            <Button
                title="Continue without logging in"
                onPress={() =>
                    navigation.navigate('All Bathrooms')
                }
            />
        </View>
    )
}