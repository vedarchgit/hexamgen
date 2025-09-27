import 'package:flutter/material.dart';

class DataTableSectionWidget extends StatelessWidget {
  final List<Map<String, dynamic>> apiData;
  final bool isLoading;

  const DataTableSectionWidget({
    super.key,
    required this.apiData,
    required this.isLoading,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Recent Activity',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.white),
            ),
            Text(
              'Latest transactions and updates',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70),
            ),
            const SizedBox(height: 16),
            isLoading
                ? const Center(child: CircularProgressIndicator())
                : apiData.isEmpty
                    ? const Center(child: Text('No data available', style: TextStyle(color: Colors.white54)))
                    : SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: DataTable(
                          columns: const [
                            DataColumn(label: Text('ID', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white70))),
                            DataColumn(label: Text('Name', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white70))),
                            DataColumn(label: Text('Value', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white70))),
                            DataColumn(label: Text('Status', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white70))),
                            DataColumn(label: Text('Date', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white70))),
                            DataColumn(label: Text('Action', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white70))),
                          ],
                          rows: apiData.map((item) {
                            Color statusColor;
                            String statusText = item['status'];
                            switch (statusText) {
                              case 'active':
                                statusColor = Colors.green.shade700;
                                break;
                              case 'pending':
                                statusColor = Colors.yellow.shade700;
                                break;
                              case 'inactive':
                                statusColor = Colors.grey.shade700;
                                break;
                              default:
                                statusColor = Colors.grey;
                            }
                            return DataRow(cells: [
                              DataCell(Text('#${item['id']}', style: const TextStyle(color: Colors.white))),
                              DataCell(Text(item['name'], style: const TextStyle(color: Colors.white))),
                              DataCell(Text('\$${item['value']}', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                              DataCell(Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: statusColor.withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(
                                  statusText,
                                  style: TextStyle(color: statusColor, fontSize: 12, fontWeight: FontWeight.bold),
                                ),
                              )),
                              DataCell(Text(item['date'], style: const TextStyle(color: Colors.white70))),
                              DataCell(TextButton(
                                onPressed: () {},
                                child: Text('View Details', style: TextStyle(color: Theme.of(context).colorScheme.primary)),
                              )),
                            ]);
                          }).toList(),
                        ),
                      ),
          ],
        ),
      ),
    );
  }
}