# HexamGen Mobile App

This is the Flutter mobile application for HexamGen, an AI-powered learning assistant. This app integrates with the FastAPI backend to provide features like PYQ analysis, quizzes, notes management, study plans, and gamified learning.

## Getting Started

### Prerequisites

*   **Flutter SDK:** Ensure you have the Flutter SDK installed and configured. You can verify this by running `flutter doctor`.
*   **Android SDK:** For running on Android devices/emulators, ensure your Android toolchain is set up. `flutter doctor` will guide you.
*   **FastAPI Backend:** The mobile app communicates with a FastAPI backend. Ensure the backend is running and accessible.

### Installation

1.  **Navigate to the `mobile` directory:**
    ```bash
    cd mobile
    ```
2.  **Install Flutter dependencies:**
    ```bash
    flutter pub get
    ```

### Running the App

1.  **Start your FastAPI Backend:**
    Navigate to your project's root directory and run:
    ```bash
    cd backend/ && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    ```
    *(Ensure your `GEMINI_API_KEY` environment variable is set for the backend.)*

2.  **Connect an Android Device/Emulator:**
    *   Ensure USB debugging is enabled on your Android device.
    *   Connect your device via USB, or start an Android emulator.
    *   Verify Flutter detects it: `flutter devices`

3.  **Run the Flutter Application:**
    Navigate to the `mobile` directory and run:
    ```bash
    flutter run
    ```

### Key Features Implemented (UI & Initial Backend Connection)

*   **Educational Dashboard:** A comprehensive dashboard displaying key learning metrics (Quizzes Completed, Total XP, Current Streak, Avg. Quiz Score).
*   **Dynamic Navigation:** Functional sidebar navigation to switch between different content pages (Dashboard, Notes, Quizzes, Analyzer, Leaderboard, Study Plan, Settings).
*   **Themed UI:** User interface styled to match the dark, indigo-purple aesthetic of the web frontend.
*   **Backend Integration (Initial):**
    *   `ApiService` configured to fetch real system status, recent activities, and trigger sync operations from the FastAPI backend.
    *   Backend endpoints (`/v1/status`, `/v1/pyq/activities/recent`, `/v1/pyq/sync`) implemented (currently with mock data for activities/sync).
*   **Placeholder Pages:** Each navigation page includes sample content and an "Add Yours" button (or equivalent) to indicate future functionality.