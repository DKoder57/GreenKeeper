import { router, Tabs } from "expo-router";
import { Button } from "../../shared/components/Button";

export default function TabsLayout () {
    return ( 
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
        </Tabs>        
    );
}