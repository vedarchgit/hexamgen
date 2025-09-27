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