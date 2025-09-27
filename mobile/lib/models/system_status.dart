class SystemStatus {
  final String name;
  final String status;
  final String? message;

  SystemStatus({
    required this.name,
    required this.status,
    this.message,
  });

  factory SystemStatus.fromJson(Map<String, dynamic> json) {
    return SystemStatus(
      name: json['name'],
      status: json['status'],
      message: json['message'],
    );
  }
}