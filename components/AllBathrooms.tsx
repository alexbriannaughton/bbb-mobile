import { Text, View } from "react-native"
import { supabase } from '../lib/supabase'
import { useEffect, useState } from "react"

export default function AllBathrooms() {
    const [bathrooms, setBathrooms] = useState([])
    useEffect(() => {
        getBathrooms()
    },[])
    console.log(bathrooms)
    async function getBathrooms() {
        try {
            let { data } = await supabase
                .from('bathrooms')
                .select(`*`)
    
            setBathrooms(data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <View>
            {bathrooms && bathrooms.map((b) => <Text key={b.id}>{b.location_name}</Text>)}
        </View>
    )
}