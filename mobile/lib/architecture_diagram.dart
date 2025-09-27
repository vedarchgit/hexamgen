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
              color: (iconColor as MaterialColor).shade800,
            ),
          ),
        ],
      ),
    );
  }
}