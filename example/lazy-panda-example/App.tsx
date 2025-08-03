import React, { useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  ThemeProvider,
  lightTheme,
  darkTheme,
  Box,
  Stack,
  Button,
  Text,
  Card,
  Select,
  TextField,
  Switch,
  Alert,
} from '@lazy-panda/ui';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView>
        <Box padding="lg">
          <Stack spacing="lg">
            {/* Theme Switch */}
            <Card>
              <Stack spacing="md">
                <Text variant="h6">Theme Mode</Text>
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
                />
              </Stack>
            </Card>

            {/* Buttons Example */}
            <Card>
              <Stack spacing="md">
                <Text variant="h6">Buttons</Text>
                <Stack direction="row" spacing="sm">
                  <Button variant="filled" onPress={() => {}}>
                    Filled
                  </Button>
                  <Button variant="tonal" onPress={() => {}}>
                    Tonal
                  </Button>
                  <Button variant="outlined" onPress={() => {}}>
                    Outlined
                  </Button>
                </Stack>
              </Stack>
            </Card>

            {/* Form Controls Example */}
            <Card>
              <Stack spacing="md">
                <Text variant="h6">Form Controls</Text>
                <TextField
                  label="Name"
                  placeholder="Enter your name"
                  onChangeText={() => {}}
                />
                <Select
                  label="Country"
                  value={selectedValue}
                  onValueChange={setSelectedValue}
                  items={[
                    { label: 'United States', value: 'us' },
                    { label: 'United Kingdom', value: 'uk' },
                    { label: 'Canada', value: 'ca' },
                  ]}
                />
              </Stack>
            </Card>

            {/* Alert Example */}
            <Alert
              severity="info"
              title="Information"
              message="This is an example app showing Lazy Panda UI components"
            />

            <Alert
              severity="success"
              title="Success"
              message="Components are working properly!"
            />
          </Stack>
        </Box>
      </ScrollView>
    </ThemeProvider>
  );
}
