
import 'package:flutter/material.dart';

const primaryColor = Color(0xFF6C63FF);
const secondaryColor = Color(0xFF1E1E2C);
const accentColor = Color(0xFFF5F5F5);

final darkTheme = ThemeData(
  brightness: Brightness.dark,
  primaryColor: primaryColor,
  colorScheme: ColorScheme.dark(
    primary: primaryColor,
    secondary: secondaryColor,
    surface: secondaryColor,
    error: Colors.red,
    onPrimary: accentColor,
    onSecondary: accentColor,
    onSurface: accentColor,
    onError: accentColor,
  ),
  scaffoldBackgroundColor: secondaryColor,
  appBarTheme: const AppBarTheme(
    backgroundColor: secondaryColor,
    elevation: 0,
    iconTheme: IconThemeData(color: accentColor),
  ),
  cardTheme: CardTheme(
    color: secondaryColor.withOpacity(0.5),
    elevation: 1,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10),
    ),
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: primaryColor,
      foregroundColor: accentColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
    ),
  ),
);
