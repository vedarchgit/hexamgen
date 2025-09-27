import 'package:flutter/material.dart';
import 'package:hexamgen_mobile/dashboard_screen.dart';

// Define custom colors based on frontend theme
const Color primaryIndigo = Color(0xFF4F46E5); // Tailwind indigo-600
const Color accentAmber = Color(0xFFF59E0B); // Tailwind amber-500
const Color darkBackground = Color(0xFF1A202C); // A dark grey/blue, similar to indigo-900/black blend
const Color lightForeground = Colors.white;
const Color mutedForeground = Colors.white70;

void main() {
  runApp(const HexamgenApp());
}

class HexamgenApp extends StatelessWidget {
  const HexamgenApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PYQ Analyzer',
      theme: ThemeData(
        brightness: Brightness.dark, // Overall dark theme
        primaryColor: primaryIndigo,
        colorScheme: ColorScheme.dark(
          primary: primaryIndigo,
          secondary: accentAmber,
          background: darkBackground,
          surface: darkBackground, // For cards, dialogs etc.
          onPrimary: lightForeground,
          onSecondary: Colors.black, // Text on amber buttons
          onBackground: lightForeground,
          onSurface: lightForeground,
        ),
        scaffoldBackgroundColor: darkBackground, // Main background
        appBarTheme: const AppBarTheme(
          backgroundColor: darkBackground, // Dark background for app bar
          foregroundColor: lightForeground,
          elevation: 0,
          centerTitle: true,
        ),
        cardTheme: CardThemeData(
          color: Colors.white.withOpacity(0.05), // Semi-transparent dark card
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: Colors.white.withOpacity(0.1)), // Light border
          ),
          elevation: 2,
          margin: const EdgeInsets.all(0), // Remove default margin
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: accentAmber, // Amber for primary buttons
            foregroundColor: Colors.black, // Black text on amber
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            textStyle: const TextStyle(fontWeight: FontWeight.w600),
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: lightForeground, // White text for ghost buttons
          ),
        ),
        // Input field theme (similar to frontend's bg-white/10 border-white/20)
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white.withOpacity(0.05),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide(color: accentAmber.withOpacity(0.5)), // Focus color
          ),
          labelStyle: const TextStyle(color: mutedForeground),
          hintStyle: TextStyle(color: mutedForeground.withOpacity(0.5)),
        ),
        // Switch theme
        switchTheme: SwitchThemeData(
          thumbColor: MaterialStateProperty.resolveWith((states) {
            if (states.contains(MaterialState.selected)) {
              return primaryIndigo; // Active color
            }
            return Colors.grey.shade400; // Inactive color
          }),
          trackColor: MaterialStateProperty.resolveWith((states) {
            if (states.contains(MaterialState.selected)) {
              return primaryIndigo.withOpacity(0.5); // Active track color
            }
            return Colors.grey.shade600; // Inactive track color
          }),
        ),
        // Text theme for general text styles
        textTheme: const TextTheme(
          bodyLarge: TextStyle(color: lightForeground),
          bodyMedium: TextStyle(color: mutedForeground),
          titleLarge: TextStyle(color: lightForeground, fontWeight: FontWeight.bold),
          titleMedium: TextStyle(color: lightForeground, fontWeight: FontWeight.w600),
          titleSmall: TextStyle(color: mutedForeground),
        ),
      ),
      home: const DashboardScreen(),
    );
  }
}