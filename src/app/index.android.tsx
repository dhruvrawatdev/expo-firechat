import { StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ANDROID</Text>
        </View>
        
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are logged in on Android</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Platform Details</Text>
          <Text style={styles.infoText}>OS: {Platform.OS}</Text>
          <Text style={styles.infoText}>Version: {Platform.Version}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  badge: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 24,
    elevation: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  email: {
    fontSize: 14,
    color: "#1976D2",
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 4,
    width: "100%",
    marginBottom: 32,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#1976D2",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 4,
    minWidth: 200,
    alignItems: "center",
    elevation: 2,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
