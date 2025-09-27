import 'package:flutter/material.dart';

class StatsGridWidget extends StatelessWidget {
  final List<Map<String, dynamic>> stats;

  const StatsGridWidget({super.key, required this.stats});

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2, // Two columns for mobile
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1.2, // Adjust as needed
      ),
      itemCount: stats.length,
      itemBuilder: (context, index) {
        final stat = stats[index];
        final IconData icon = stat['icon'];
        final List<Color> gradientColors = stat['gradient'];
        final String trend = stat['trend'];
        final String change = stat['change'];

        return Card(
          color: Theme.of(context).cardTheme.color, // Use theme card color
          shape: Theme.of(context).cardTheme.shape, // Use theme card shape
          elevation: Theme.of(context).cardTheme.elevation,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8.0),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: gradientColors,
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: gradientColors[0].withOpacity(0.3),
                            blurRadius: 8,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Icon(icon, color: Colors.white, size: 24),
                    ),
                    // MoreVertical icon (optional, can be added later if needed)
                    // Icon(Icons.more_vert, color: Colors.grey.shade400),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      stat['value'],
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
                    ),
                    Text(
                      stat['title'],
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Icon(
                      trend == 'up' ? Icons.arrow_upward : Icons.arrow_downward,
                      color: trend == 'up' ? Colors.green.shade400 : Colors.red.shade400,
                      size: 16,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      change,
                      style: TextStyle(
                        color: trend == 'up' ? Colors.green.shade400 : Colors.red.shade400,
                        fontWeight: FontWeight.w500,
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'from last period',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white54),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}