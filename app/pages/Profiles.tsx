import { profiles } from '@/data/profiles';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfilesList = () => {
    const renderProfile = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.navigate({pathname:'/pages/ProfileDetail', params:{ id: item.id }})}
        >
            <Image source={item.profile} style={styles.profileImage} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.designation}>{item.designation}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.star}>★ {item.star}</Text>
                    <Text style={styles.shop}>{item.shop}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={profiles}
                renderItem={renderProfile}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    listContent: { padding: 16 },
    card: { marginBottom: 16, borderRadius: 8, overflow: 'hidden', backgroundColor: '#FDCCC540', flexDirection: 'row' },
    profileImage: { width: 100, height: 100, resizeMode: 'cover' },
    info: { padding: 12 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    designation: { fontSize: 14, color: '#666', marginBottom: 8 },
    ratingContainer: { flexDirection: 'row', justifyContent: 'flex-start', gap: 15 },
    star: { fontSize: 14, fontWeight: 'bold', color: '#FFA500' },
    shop: { fontSize: 12, color: '#999' },
});

export default ProfilesList;