import 'package:flutter/material.dart';

class SidebarWidget extends StatelessWidget {
  final String activeNav;
  final Function(String) onNavSelected;

  const SidebarWidget({
    super.key,
    required this.activeNav,
    required this.onNavSelected,
  });

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> navItems = [
      {'name': 'Dashboard', 'icon': Icons.dashboard},
      {'name': 'Notes', 'icon': Icons.book},
      {'name': 'Quizzes', 'icon': Icons.quiz},
      {'name': 'Analyzer', 'icon': Icons.analytics},
      {'name': 'Leaderboard', 'icon': Icons.leaderboard},
      {'name': 'Study Plan', 'icon': Icons.calendar_today},
      {'name': 'Settings', 'icon': Icons.settings},
    ];

    return Drawer(
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Colors.black, // Deep black
              Colors.grey.shade900, // Dark grey
            ],
          ),
        ),
        child: Column(
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(color: Colors.grey.shade700)),
              ),
              child: Row(
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Theme.of(context).colorScheme.primary, // violet-500
                          Theme.of(context).colorScheme.secondary, // purple-600
                        ],
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(Icons.bar_chart, color: Colors.white, size: 24),
                  ),
                  const SizedBox(width: 12),
                  const Text(
                    'HexamGen',
                    style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(16.0),
                itemCount: navItems.length,
                itemBuilder: (context, index) {
                  final item = navItems[index];
                  final IconData icon = item['icon'];
                  final bool isActive = activeNav == item['name'];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8.0),
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () => onNavSelected(item['name']),
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            gradient: isActive
                                ? LinearGradient(
                                    colors: [
                                      Theme.of(context).colorScheme.primary, // violet-500
                                      Theme.of(context).colorScheme.secondary, // purple-600
                                    ],
                                  )
                                : null,
                            color: isActive ? null : Colors.grey.shade700.withOpacity(0.5),
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: isActive
                                ? [
                                    BoxShadow(
                                      color: Theme.of(context).colorScheme.primary.withOpacity(0.25),
                                      blurRadius: 8,
                                      offset: const Offset(0, 4),
                                    ),
                                  ]
                                : null,
                          ),
                          child: Row(
                            children: [
                              Icon(icon, color: isActive ? Colors.white : Colors.grey.shade400, size: 20),
                              const SizedBox(width: 16),
                              Text(
                                item['name'],
                                style: TextStyle(
                                  color: isActive ? Colors.white : Colors.grey.shade400,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              if (isActive) const Spacer(),
                              if (isActive) const Icon(Icons.chevron_right, color: Colors.white, size: 16),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () { /* Handle Logout */ },
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade700.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.logout, color: Colors.grey.shade400, size: 20),
                        const SizedBox(width: 16),
                        Text(
                          'Logout',
                          style: TextStyle(
                            color: Colors.grey.shade400,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}