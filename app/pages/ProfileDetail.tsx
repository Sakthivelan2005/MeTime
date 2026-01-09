import { ThemedText } from "@/components/themed-text";
import { Icons } from "@/config/icons";
import { profiles } from "@/data/profiles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileDetail() {
  const { id } = useLocalSearchParams();
  const selectedProfile = profiles.find((i) => i.id === Number(id));
  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImageContainer}>
        <Image source={selectedProfile?.profile} style={styles.headerImage} />
          {/* Bottom dark overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 1)']}
        locations={[0, 3]}
        style={styles.bottomShadow}
        pointerEvents="none"
      />
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          {Icons.Back}
        </TouchableOpacity>
        {/* Business Info */}
      <View style={styles.businessInfo}>
          <ThemedText type='32px' style={styles.businessName}>{selectedProfile?.shop}</ThemedText>
          <ThemedText style={styles.address}>{selectedProfile?.location}</ThemedText>
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button}>
          {Icons.call}
          <ThemedText style={styles.buttonThemedText}>Call</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          {Icons.message}
          <ThemedText style={styles.buttonThemedText}>Message</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          {Icons.direction}
          <ThemedText style={styles.buttonThemedText}>Directions</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          {Icons.share}
          <ThemedText style={styles.buttonThemedText}>Share</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Promotions */}
      <View style={styles.promotions}>
        <View style={styles.promoCard}>
          <ThemedText style={styles.promoDiscount}>10% off</ThemedText>
          <ThemedText style={styles.promoCode}>use code FREE10</ThemedText>
        </View>
        <View style={styles.promoCard}>
          <ThemedText style={styles.promoDiscount}>30% off on Debit Card</ThemedText>
          <ThemedText style={styles.promoCode}>No coupon required</ThemedText>
        </View>
      </View>

      {/* Reviews Section */}
      <View style={styles.reviewsSection}>
        <ThemedText style={styles.reviewsTitle}>Customer reviews</ThemedText>
        <View style={styles.ratingRow}>
          <ThemedText style={styles.ratingValue}>
            {selectedProfile?.star} out of 5
          </ThemedText>
          <ThemedText style={styles.ratingCount}>27 global ratings</ThemedText>
        </View>

        {/* Star Ratings Breakdown */}
        <View style={styles.starsBreakdown}>
          <StarRow stars={5} percentage={80} />
          <StarRow stars={4} percentage={10} />
          <StarRow stars={3} percentage={5} />
          <StarRow stars={2} percentage={5} />
          <StarRow stars={1} percentage={0} />
        </View>

        {/* Write Review Button */}
        <TouchableOpacity style={styles.writeReviewButton}>
          <ThemedText style={styles.writeReviewThemedText}>Write a review</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function StarRow({ stars, percentage }: { stars: number; percentage: number }) {
  return (
    <View style={styles.starRow}>
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <MaterialCommunityIcons
            key={i}
            name={i < stars ? "star" : "star-outline"}
            size={16}
            color="#FFA500"
          />
        ))}
      </View>
      <ThemedText style={styles.percentage}>{percentage}%</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImageContainer: {
    position: "relative",
    height: 300,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
   bottomShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200, // increase for stronger/taller shadow
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 10,
    borderRadius: 60,
    padding: 10,
    backgroundColor: '#0000002f'
  },
  businessInfo: {
    shadowColor: '#000',
    
    padding: 30,
    paddingTop: 60,
    position:"absolute",
    bottom: 0,
    width: '100%',
  },
  businessName: {
    color: "#fff",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#ccc",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  button: {
    alignItems: "center",
    flex: 1,
  },
  buttonThemedText: {
    marginTop: 8,
    fontSize: 12,
    color: "#007AFF",
  },
  promotions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  promoCard: {
    flex: 1,
    backgroundColor: "#fff3e0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  promoDiscount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  promoCode: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  reviewsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  ratingRow: {
    marginBottom: 16,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingCount: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  starsBreakdown: {
    marginBottom: 16,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
    flex: 1,
  },
  percentage: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
    minWidth: 30,
  },
  writeReviewButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  writeReviewThemedText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});
