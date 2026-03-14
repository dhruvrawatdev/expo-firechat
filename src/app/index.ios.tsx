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
          <Text style={styles.badgeText}>iOS</Text>
        </View>
        
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are logged in on iOS</Text>
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
    backgroundColor: "#f5f5f7",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  badge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: "#666",
    marginBottom: 16,
  },
  email: {
    fontSize: 15,
    color: "#007AFF",
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
