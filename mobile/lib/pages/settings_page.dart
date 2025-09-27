import 'package:flutter/material.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        backgroundColor: Theme.of(context).colorScheme.background,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'App Preferences',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 16),
            // Sample Settings Section
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Notification Settings',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.white),
                    ),
                    const SizedBox(height: 8),
                    SwitchListTile(
                      title: Text(
                        'Enable Push Notifications',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                      ),
                      value: true, // Mock value
                      onChanged: (bool value) {
                        print('Toggle Push Notifications: \$value');
                        // Logic to update notification setting
                      },
                      activeColor: Theme.of(context).colorScheme.primary,
                    ),
                    SwitchListTile(
                      title: Text(
                        'Enable Email Notifications',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                      ),
                      value: false, // Mock value
                      onChanged: (bool value) {
                        print('Toggle Email Notifications: \$value');
                        // Logic to update email setting
                      },
                      activeColor: Theme.of(context).colorScheme.primary,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Data Management',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.white),
                    ),
                    const SizedBox(height: 8),
                    ListTile(
                      title: Text(
                        'Clear Cache',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                      ),
                      trailing: const Icon(Icons.chevron_right, color: Colors.white70),
                      onTap: () {
                        print('Clear Cache button pressed');
                        // Logic to clear cache
                      },
                    ),
                    ListTile(
                      title: Text(
                        'Export Data',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                      ),
                      trailing: const Icon(Icons.chevron_right, color: Colors.white70),
                      onTap: () {
                        print('Export Data button pressed');
                        // Logic to export data
                      },
                    ),
                  ],
                ),
              ),
            ),
            // Add more sample settings as needed
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          print('Save Settings button pressed');
          // Logic to save settings
        },
        label: const Text('Save Settings'),
        icon: const Icon(Icons.save),
        backgroundColor: Theme.of(context).colorScheme.secondary,
        foregroundColor: Colors.black,
      ),
    );
  }
}