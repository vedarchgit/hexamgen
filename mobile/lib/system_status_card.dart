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