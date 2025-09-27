import 'package:flutter/material.dart';
import 'package:hexamgen_mobile/models/system_status.dart';
import 'package:hexamgen_mobile/services/api_service.dart';
import 'package:hexamgen_mobile/widgets/sidebar_widget.dart';
import 'package:hexamgen_mobile/widgets/stats_grid_widget.dart';
import 'package:hexamgen_mobile/widgets/charts_section_widget.dart';
import 'package:hexamgen_mobile/widgets/data_table_section_widget.dart';
import 'package:hexamgen_mobile/pages/notes_page.dart';
import 'package:hexamgen_mobile/pages/quizzes_page.dart';
import 'package:hexamgen_mobile/pages/analyzer_page.dart';
import 'package:hexamgen_mobile/pages/leaderboard_page.dart';
import 'package:hexamgen_mobile/pages/study_plan_page.dart';
import 'package:hexamgen_mobile/pages/settings_page.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService _apiService = ApiService();
  List<SystemStatus> _systemStatus = []; // Will be used for system status, not directly in this dashboard
  List<Map<String, dynamic>> _recentActivities = []; // Will be used for recent activities table
  bool _isLoading = true;
  bool _isSyncing = false;
  String _selectedPeriod = '7d'; // For period filter
  String _searchQuery = '';
  String _activeNav = 'Dashboard'; // Track active navigation item

  // Mock data for the new educational dashboard
  final List<Map<String, dynamic>> _stats = [
    { 'title': 'Quizzes Completed', 'value': '847', 'change': '+15%', 'trend': 'up', 'icon': Icons.quiz, 'gradient': [Color(0xFF8B5CF6), Color(0xFF9333EA)] }, // violet-500 to purple-600
    { 'title': 'Total XP Earned', 'value': '12,450', 'change': '+25%', 'trend': 'up', 'icon': Icons.star, 'gradient': [Color(0xFF3B82F6), Color(0xFF06B6D4)] }, // blue-500 to cyan-600
    { 'title': 'Current Streak', 'value': '15 Days', 'change': '+2 Days', 'trend': 'up', 'icon': Icons.local_fire_department, 'gradient': [Color(0xFF10B981), Color(0xFF0D9488)] }, // emerald-500 to teal-600
    { 'title': 'Avg. Quiz Score', 'value': '87%', 'change': '-2%', 'trend': 'down', 'icon': Icons.score, 'gradient': [Color(0xFFF97316), Color(0xFFDC2626)] }, // orange-500 to red-600
  ];

  final List<Map<String, dynamic>> _apiData = [
    { 'id': 1, 'name': 'DSA Quiz Attempt', 'value': 85, 'status': 'completed', 'date': '2024-01-15' },
    { 'id': 2, 'name': 'PYQ Analysis (CN)', 'value': 1, 'status': 'processed', 'date': '2024-01-16' },
    { 'id': 3, 'name': 'New Note Added', 'value': 1, 'status': 'published', 'date': '2024-01-17' },
    { 'id': 4, 'name': 'ML Quiz Attempt', 'value': 72, 'status': 'completed', 'date': '2024-01-18' },
    { 'id': 5, 'name': 'Study Plan Generated', 'value': 1, 'status': 'created', 'date': '2024-01-19' },
  ];

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    setState(() => _isLoading = true);
    try {
      // Simulate fetching data
      await Future.delayed(const Duration(seconds: 1));
      // In a real app, you'd fetch real data here
      _recentActivities = _apiData; // Using mock apiData for recent activities table
      _systemStatus = await _apiService.fetchSystemStatus(); // Using mock data from api_service

      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to load data')),
        );
      }
    }
  }

  Future<void> _handleRefresh() async {
    setState(() => _isSyncing = true);
    await _fetchData();
    setState(() => _isSyncing = false);
  }

  // Method to get the widget for the selected navigation item
  Widget _getPageWidget(String navItemName) {
    switch (navItemName) {
      case 'Dashboard':
        return _buildDashboardContent(); // The existing dashboard content
      case 'Notes':
        return const NotesPage();
      case 'Quizzes':
        return const QuizzesPage();
      case 'Analyzer':
        return const AnalyzerPage();
      case 'Leaderboard':
        return const LeaderboardPage();
      case 'Study Plan':
        return const StudyPlanPage();
      case 'Settings':
        return const SettingsPage();
      default:
        return Center(
          child: Text(
            'Page Not Found: \$navItemName',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
          ),
        );
    }
  }

  // Helper method to encapsulate the original dashboard content
  Widget _buildDashboardContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Page Header
          Padding(
            padding: const EdgeInsets.only(bottom: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Welcome back, Scholar!',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
                    ),
                    Text(
                      'Here\'s your learning overview today.',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                    ),
                  ],
                ),
                // Refresh Button
                ElevatedButton.icon(
                  onPressed: _isSyncing ? null : _handleRefresh,
                  icon: _isSyncing
                      ? const SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(strokeWidth: 2, valueColor: AlwaysStoppedAnimation<Color>(Colors.white)))
                      : const Icon(Icons.refresh, size: 18),
                  label: Text(_isSyncing ? 'Refreshing...' : 'Refresh'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).colorScheme.secondary, // Use accent color
                    foregroundColor: Colors.black,
                  ),
                ),
              ],
            ),
          ),

          // Stats Grid
          StatsGridWidget(stats: _stats),
          const SizedBox(height: 24),

          // Charts Section (Placeholders for now)
          ChartsSectionWidget(),
          const SizedBox(height: 24),

          // Data Table Section
          DataTableSectionWidget(apiData: _apiData, isLoading: _isLoading),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background, // Use theme background
      appBar: AppBar(
        title: const Text('HexamGen Dashboard'),
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu), // Menu icon for sidebar
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications), // Bell icon
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.settings), // Settings icon
            onPressed: () {},
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primary, // UserCircle icon
              child: const Icon(Icons.account_circle, color: Colors.white),
            ),
          ),
        ],
      ),
      drawer: SidebarWidget(
        activeNav: _activeNav,
        onNavSelected: (navItemName) {
          setState(() {
            _activeNav = navItemName;
            print('Selected navigation: \$navItemName');
          });
          Navigator.pop(context); // Close the drawer
        },
      ),
      body: Stack(
        children: [
          // Background Image
          Positioned.fill(
            child: Image.asset(
              'assets/images/cosmic-background.jpeg',
              fit: BoxFit.cover,
            ),
          ),
          // Gradient Overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Colors.indigo.shade900.withOpacity(0.6),
                    Colors.black.withOpacity(0.4),
                    Colors.purple.shade900.withOpacity(0.3),
                  ],
                ),
              ),
            ),
          ),
          // Main Content Area
          SafeArea(
            child: RefreshIndicator(
              onRefresh: _handleRefresh,
              child: _getPageWidget(_activeNav), // Display selected page content
            ),
          ),
        ],
      ),
    );
  }
}
