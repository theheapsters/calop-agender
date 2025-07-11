import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity, View } from 'react-native';

// Telas
import Home from '../screens/Home';
import AddScheduling from '../screens/AddScheduling';
import MySchedulings from '../screens/MySchedulings';
// import Tests from '../screens/Tests';

// Cores
import { projectPalete } from '../assets/styles/colors';

// hooks
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';

// navigation
const Tab = createBottomTabNavigator();
const ROUTES = {
    HOME: 'Tela inicial',
    ADD: 'Criar serviço',
    MY_SCHEDULINGS: 'Agendar serviço',
    SETTINGS: 'Settings',
    // TESTS: 'Testes',
    SERVICES: 'Services'
};

export default function HomeTabs({ navigation }) {
    const keyboardVisible = useKeyboardVisible();

    return (
        <Tab.Navigator
            initialRouteName={ROUTES.HOME}
            screenOptions={({ route }) => ({
                headerTitle: "Calop Agender",
                headerTintColor: projectPalete.color3,
                headerStyle: { backgroundColor: projectPalete.color1 },
                headerLeft: () => (
                    <Image
                        source={require('../assets/images/logo-app.png')}
                        style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SETTINGS)}>
                        <Ionicons name="settings" size={30} color="white" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                ),
                tabBarActiveTintColor: projectPalete.color1,
                tabBarInactiveTintColor: projectPalete.color3,
                tabBarStyle: {
                    backgroundColor: "#F4ECDD",
                    display: keyboardVisible ? 'none' : 'flex'
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;
                    if (route.name === ROUTES.HOME) iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === ROUTES.ADD) iconName = focused ? 'add-circle' : 'add-circle-outline';
                    else if (route.name === ROUTES.MY_SCHEDULINGS) iconName = focused ? 'calendar' : 'calendar-outline';
                    // else if (route.name === ROUTES.TESTS) iconName = focused ? 'flask' : 'flask-outline';
                    return <Ionicons name={iconName} size={focused ? size + 4 : size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name={ROUTES.ADD}
                component={AddScheduling}
                options={({ navigation }) => ({
                    headerTitle: 'Calop Agender',
                    headerStyle: { backgroundColor: projectPalete.color1 },
                    headerTintColor: projectPalete.color3,
                    headerLeft: () => (
                        <Image
                            source={require('../assets/images/logo-app.png')}
                            style={{ width: 30, height: 30, marginLeft: 10 }}
                        />
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.SERVICES)}
                                style={{ marginRight: 15 }}
                            >
                                <Ionicons
                                    name="list-sharp"
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.SETTINGS)}
                                style={{ marginRight: 10 }}
                            >
                                <Ionicons
                                    name="settings"
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
            <Tab.Screen name={ROUTES.HOME} component={Home} />
            <Tab.Screen name={ROUTES.MY_SCHEDULINGS} component={MySchedulings} />
            {/* <Tab.Screen name={ROUTES.TESTS} component={Tests} /> */}
        </Tab.Navigator>
    );
}