// lib/main.dart
import 'package:flutter/material.dart';
import 'package:hexamgen_mobile/dashboard_screen.dart';

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
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: const Color(0xFFF0F4FF),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF4F46E5),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
        cardTheme: CardTheme(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 2,
          color: Colors.white,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF4F46E5),
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
      ),
      home: const DashboardScreen(),
    );
  }
}

// lib/dashboard_screen.dart
import 'package:flutter/material.dart';
import 'package:hexamgen_mobile/system_status_card.dart';
import 'package:hexamgen_mobile/recent_activities_card.dart';
import 'package:hexamgen_mobile/ai_features_card.dart';
import 'package:hexamgen_mobile/architecture_diagram.dart';
import 'package:hexamgen_mobile/models/system_status.dart';
import 'package:hexamgen_mobile/services/api_service.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService _apiService = ApiService();
  List<SystemStatus> _systemStatus = [];
  List<Map<String, dynamic>> _recentActivities = [];
  bool _isLoading = true;
  bool _isSyncing = false;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    setState(() => _isLoading = true);
    try {
      final status = await _apiService.fetchSystemStatus();
      final activities = await _apiService.fetchRecentActivities();
      
      setState(() {
        _systemStatus = status;
        _recentActivities = activities;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      // Show error snackbar
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to load data')),
        );
      }
    }
  }

  Future<void> _syncWithBackend() async {
    setState(() => _isSyncing = true);
    try {
      await _apiService.syncWithBackend();
      await _fetchData(); // Refresh data after sync
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('System synchronized successfully')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to sync with backend')),
        );
      }
    } finally {
      setState(() => _isSyncing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('PYQ Analyzer Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _isLoading ? null : _fetchData,
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _fetchData,
        child: _isLoading
            ? const Center(child: CircularProgressIndicator())
            : SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Sync Button
                    Align(
                      alignment: Alignment.centerRight,
                      child: ElevatedButton.icon(
                        onPressed: _isSyncing ? null : _syncWithBackend,
                        icon: _isSyncing
                            ? const SizedBox(
                                width: 16,
                                height: 16,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor:
                                      AlwaysStoppedAnimation<Color>(Colors.white),
                                ),
                              )
                            : const Icon(Icons.sync, size: 18),
                        label: Text(_isSyncing ? 'Syncing...' : 'Sync'),
                      ),
                    ),
                    const SizedBox(height: 16),
                    
                    // Architecture Diagram
                    const ArchitectureDiagram(),
                    const SizedBox(height: 20),
                    
                    // System Status
                    SystemStatusCard(statusList: _systemStatus),
                    const SizedBox(height: 20),
                    
                    // Recent Activities
                    RecentActivitiesCard(activities: _recentActivities),
                    const SizedBox(height: 20),
                    
                    // AI Features
                    const AIFeaturesCard(),
                  ],
                ),
              ),
      ),
    );
  }
}

// lib/architecture_diagram.dart
import 'package:flutter/material.dart';

class ArchitectureDiagram extends StatelessWidget {
  const ArchitectureDiagram({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'System Architecture',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 400,
              child: Stack(
                children: [
                  // Mobile App
                  Positioned(
                    top: 0,
                    left: 0,
                    right: 0,
                    child: _buildComponent(
                      'Mobile App',
                      Icons.phone_android,
                      Colors.purple.shade100,
                      Colors.purple,
                    ),
                  ),
                  
                  // n8n Automation
                  Positioned(
                    top: 80,
                    left: 0,
                    right: 0,
                    child: _buildComponent(
                      'n8n Automation',
                      Icons.settings,
                      Colors.green.shade100,
                      Colors.green,
                    ),
                  ),
                  
                  // Arrows
                  Positioned(
                    top: 60,
                    left: 0,
                    right: 0,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          width: 60,
                          height: 2,
                          color: Colors.grey,
                        ),
                        Container(
                          width: 60,
                          height: 2,
                          color: Colors.grey,
                        ),
                      ],
                    ),
                  ),
                  
                  // Backend and APIs
                  Positioned(
                    top: 160,
                    left: 0,
                    right: 0,
                    child: Container(
                      height: 120,
                      decoration: BoxDecoration(
                        color: Colors.blue.shade100,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.blue.shade300),
                      ),
                      child: Stack(
                        children: [
                          Center(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.api, size: 40, color: Colors.blue.shade700),
                                const SizedBox(height: 8),
                                Text(
                                  'FastAPI Backend',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Colors.blue.shade800,
                                  ),
                                ),
                                Text(
                                  'Python/SQLAlchemy',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Colors.blue.shade600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          // API Components
                          Positioned(
                            top: 8,
                            right: 8,
                            child: Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(8),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.3),
                                    blurRadius: 4,
                                  ),
                                ],
                              ),
                              child: Column(
                                children: [
                                  Container(
                                    width: 12,
                                    height: 12,
                                    decoration: const BoxDecoration(
                                      color: Colors.green,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  const Text(
                                    'Gemini',
                                    style: TextStyle(fontSize: 10),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Positioned(
                            bottom: 8,
                            right: 8,
                            child: Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(8),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.3),
                                    blurRadius: 4,
                                  ),
                                ],
                              ),
                              child: Column(
                                children: [
                                  Container(
                                    width: 12,
                                    height: 12,
                                    decoration: const BoxDecoration(
                                      color: Colors.green,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  const Text(
                                    'Perplexity',
                                    style: TextStyle(fontSize: 10),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  
                  // Database
                  Positioned(
                    top: 290,
                    left: 0,
                    right: 0,
                    child: _buildComponent(
                      'Database',
                      Icons.storage,
                      Colors.green.shade100,
                      Colors.green,
                    ),
                  ),
                  
                  // Web Frontend
                  Positioned(
                    top: 370,
                    left: 0,
                    right: 0,
                    child: _buildComponent(
                      'Web Frontend',
                      Icons.computer,
                      Colors.indigo.shade100,
                      Colors.indigo,
                    ),
                  ),
                  
                  // Vertical Arrows
                  Positioned(
                    top: 140,
                    left: 0,
                    right: 0,
                    child: Column(
                      children: [
                        Container(
                          width: 2,
                          height: 20,
                          color: Colors.grey,
                        ),
                        const SizedBox(height: 100),
                        Container(
                          width: 2,
                          height: 20,
                          color: Colors.grey,
                        ),
                        const SizedBox(height: 50),
                        Container(
                          width: 2,
                          height: 20,
                          color: Colors.grey,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildComponent(String title, IconData icon, Color bgColor, Color iconColor) {
    return Container(
      height: 80,
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: iconColor.withOpacity(0.5)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 32, color: iconColor),
          const SizedBox(width: 12),
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: iconColor.shade800,
            ),
          ),
        ],
      ),
    );
  }
}

// lib/system_status_card.dart
import 'package:flutter/material.dart';
import 'package:hexamgen_mobile/models/system_status.dart';

class SystemStatusCard extends StatelessWidget {
  final List<SystemStatus> statusList;

  const SystemStatusCard({super.key, required this.statusList});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'System Status',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: statusList.length,
              separatorBuilder: (_, __) => const Divider(),
              itemBuilder: (context, index) {
                final status = statusList[index];
                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(
                    status.name,
                    style: const TextStyle(fontWeight: FontWeight.w500),
                  ),
                  subtitle: Text(status.lastUpdated),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: _getStatusColor(status.status),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      status.status,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'operational':
        return Colors.green;
      case 'warning':
        return Colors.orange;
      case 'error':
        return Colors.red;
      case 'disabled':
        return Colors.grey;
      default:
        return Colors.grey;
    }
  }
}

// lib/recent_activities_card.dart
import 'package:flutter/material.dart';

class RecentActivitiesCard extends StatelessWidget {
  final List<Map<String, dynamic>> activities;

  const RecentActivitiesCard({super.key, required this.activities});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Recent Activities',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: activities.length,
              separatorBuilder: (_, __) => const Divider(),
              itemBuilder: (context, index) {
                final activity = activities[index];
                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: activity['status'] == 'success'
                          ? Colors.green
                          : Colors.red,
                      shape: BoxShape.circle,
                    ),
                  ),
                  title: Text(
                    activity['action'],
                    style: const TextStyle(fontWeight: FontWeight.w500),
                  ),
                  subtitle: Text(activity['component']),
                  trailing: Text(
                    activity['time'],
                    style: const TextStyle(color: Colors.grey),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

// lib/ai_features_card.dart
import 'package:flutter/material.dart';

class AIFeaturesCard extends StatefulWidget {
  const AIFeaturesCard({super.key});

  @override
  State<AIFeaturesCard> createState() => _AIFeaturesCardState();
}

class _AIFeaturesCardState extends State<AIFeaturesCard> {
  bool _difficultyPrediction = true;
  bool _explanationGeneration = true;
  bool _questionGeneration = false;
  bool _similaritySearch = true;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'AI Features',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            _buildFeatureToggle(
              'Difficulty Prediction',
              'Analyze PYQ complexity',
              _difficultyPrediction,
              (value) => setState(() => _difficultyPrediction = value),
            ),
            const Divider(),
            _buildFeatureToggle(
              'Explanation Generation',
              'Generate step-by-step solutions',
              _explanationGeneration,
              (value) => setState(() => _explanationGeneration = value),
            ),
            const Divider(),
            _buildFeatureToggle(
              'Question Generation',
              'Create new practice questions',
              _questionGeneration,
              (value) => setState(() => _questionGeneration = value),
            ),
            const Divider(),
            _buildFeatureToggle(
              'Similarity Search',
              'Find related questions',
              _similaritySearch,
              (value) => setState(() => _similaritySearch = value),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureToggle(
    String title,
    String subtitle,
    bool value,
    Function(bool) onChanged,
  ) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                subtitle,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                ),
              ),
            ],
          ),
        ),
        Switch(
          value: value,
          onChanged: onChanged,
          activeColor: const Color(0xFF4F46E5),
        ),
      ],
    );
  }
}

// lib/models/system_status.dart
class SystemStatus {
  final int id;
  final String name;
  final String status;
  final String lastUpdated;

  SystemStatus({
    required this.id,
    required this.name,
    required this.status,
    required this.lastUpdated,
  });

  factory SystemStatus.fromJson(Map<String, dynamic> json) {
    return SystemStatus(
      id: json['id'],
      name: json['name'],
      status: json['status'],
      lastUpdated: json['lastUpdated'],
    );
  }
}

// lib/services/api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:hexamgen_mobile/models/system_status.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:8000/api'; // Change for production

  Future<List<SystemStatus>> fetchSystemStatus() async {
    // In a real implementation, this would call your backend API
    // For now, we'll return mock data
    await Future.delayed(const Duration(milliseconds: 500));
    
    return [
      SystemStatus(
        id: 1,
        name: 'FastAPI Backend',
        status: 'operational',
        lastUpdated: '2 mins ago',
      ),
      SystemStatus(
        id: 2,
        name: 'Gemini API',
        status: 'operational',
        lastUpdated: '5 mins ago',
      ),
      SystemStatus(
        id: 3,
        name: 'Perplexity API',
        status: 'operational',
        lastUpdated: '10 mins ago',
      ),
      SystemStatus(
        id: 4,
        name: 'Database',
        status: 'operational',
        lastUpdated: 'Just now',
      ),
      SystemStatus(
        id: 5,
        name: 'n8n Automation',
        status: 'operational',
        lastUpdated: '1 min ago',
      ),
    ];
  }

  Future<List<Map<String, dynamic>>> fetchRecentActivities() async {
    await Future.delayed(const Duration(milliseconds: 500));
    
    return [
      {
        'id': 1,
        'action': 'PYQ analyzed',
        'component': 'Gemini Service',
        'time': '2 mins ago',
        'status': 'success'
      },
      {
        'id': 2,
        'action': 'Context fetched',
        'component': 'Perplexity Service',
        'time': '5 mins ago',
        'status': 'success'
      },
      {
        'id': 3,
        'action': 'Workflow triggered',
        'component': 'n8n Automation',
        'time': '10 mins ago',
        'status': 'success'
      },
      {
        'id': 4,
        'action': 'New question generated',
        'component': 'Gemini Service',
        'time': '15 mins ago',
        'status': 'success'
      },
    ];
  }

  Future<void> syncWithBackend() async {
    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));
    // In a real implementation, this would make an actual API call
  }
}

# pubspec.yaml
name: hexamgen_mobile
description: Mobile app for PYQ Analyzer
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^0.17.0
  provider: ^6.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
