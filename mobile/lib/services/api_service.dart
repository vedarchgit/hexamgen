import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:hexamgen_mobile/models/system_status.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:8000/api/v1'; // Updated to include /v1 prefix

  Future<List<SystemStatus>> fetchSystemStatus() async {
    final response = await http.get(Uri.parse('$baseUrl/status/'));

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = json.decode(response.body);
      final List<dynamic> componentsJson = data['components'];
      return componentsJson.map((json) => SystemStatus.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load system status');
    }
  }

  Future<List<Map<String, dynamic>>> fetchRecentActivities() async {
    final response = await http.get(Uri.parse('$baseUrl/pyq/activities/recent'));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((item) => item as Map<String, dynamic>).toList();
    } else {
      throw Exception('Failed to load recent activities');
    }
  }

  Future<void> syncWithBackend() async {
    final response = await http.post(Uri.parse('$baseUrl/pyq/sync'));

    if (response.statusCode != 200) {
      throw Exception('Failed to synchronize system');
    }
  }
}