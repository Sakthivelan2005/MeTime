// HomeScreen.tsx
import { ThemedText } from '@/components/themed-text';
import { Icons } from '@/config/icons';
import { Images } from '@/config/Images';
import { useAuth } from '@/context/AuthContext';
import { BANNER_DATA } from '@/data/BannerData';
import { profiles } from '@/data/profiles';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideBar from './SideBar';


const ACCENT = '#F6A6A6';
const BG = '#F9F5F4';

// Responsive utilities
const getResponsiveValues = (screenWidth: number) => {
  if (screenWidth < 375) {
    return {
      padding: 12,
      cardWidth: screenWidth * 0.85,
      gap: 10,
      fontSize: {
        title: 30,
        section: 15,
        body: 13,
        small: 12,
      },
    };
  } else if (screenWidth < 430) {
    return {
      padding: 16,
      cardWidth: screenWidth * 0.75,
      gap: 12,
      fontSize: {
        title: 32,
        section: 16,
        body: 14,
        small: 13,
      },
    };
  } else if (screenWidth < 768) {
    return {
      padding: 16,
      cardWidth: screenWidth * 0.68,
      gap: 14,
      fontSize: {
        title: 24,
        section: 17,
        body: 15,
        small: 13,
      },
    };
  } else {
    return {
      padding: 24,
      cardWidth: screenWidth * 0.55,
      gap: 16,
      fontSize: {
        title: 40,
        section: 18,
        body: 16,
        small: 14,
      },
    };
  }
};

export default function HomeScreen() {

  const { width } = useWindowDimensions();
  const responsive = getResponsiveValues(width);
  const bannerScrollRef = useRef<ScrollView>(null);

  
  const {fullName} = useAuth(); 

  const [activeTab, setActiveTab] = useState<
    'Recommended' | 'Packages' | 'Professionals'
  >('Recommended');
  const [search, setSearch] = useState('');
  const [showBar, setShowBar] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Auto-scroll banners
 useEffect(() => {
  const interval = setInterval(() => {
    setBannerIndex((prev) => {
      const nextIndex = (prev + 1) % BANNER_DATA.length;
      bannerScrollRef.current?.scrollTo({
        x: nextIndex * 332,
        animated: true,
      });
      return nextIndex;
    });
  }, 5000);

  return () => clearInterval(interval);
}, []);



  const profileSlides = profiles.slice(0, 4);

  const dynamicStyles = StyleSheet.create({
    scrollInner: {
      padding: responsive.padding,
      paddingBottom: responsive.padding + 28,
    },
    appTitle: {
      fontSize: responsive.fontSize.title,
    },
    greeting: {
      fontSize: responsive.fontSize.title - 4,
    },
    sectionTitle: {
      fontSize: responsive.fontSize.section,
    },
    salonCard: {
      width: responsive.cardWidth,
      marginRight: responsive.gap,
    },
    searchInput: {
      fontSize: responsive.fontSize.body,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Sidebar */}
      <SideBar setShowBar={setShowBar} isVisible={showBar} />

      <ScrollView
        contentContainerStyle={[styles.scrollInner, dynamicStyles.scrollInner]}
        showsVerticalScrollIndicator={false}
      >
        {/* Topbar */}
        <View style={styles.topbar}>
          <TouchableOpacity
            style={styles.hamburger}
            onPress={() => setShowBar(true)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.hamLine} />
            <View style={[styles.hamLine, { width: '65%' }]} />
            <View style={[styles.hamLine, { width: '78%' }]} />
          </TouchableOpacity>

          <ThemedText style={[styles.appTitle, dynamicStyles.appTitle]}>
            MeTime
          </ThemedText>

          <TouchableOpacity onPress={()=>router.navigate('/accounts/signup')} style={styles.profileButton}>
            <Image
              source={Images.profile}
              style={styles.profile}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Greeting + Search */}
        <View style={styles.greetingRow}>
          <ThemedText style={[styles.greeting, dynamicStyles.greeting]}>
            Hello,{' '}
            <ThemedText style={styles.greetingName}>
              {!!fullName ? fullName : 'Guest'}
            </ThemedText>
          </ThemedText>

          <View style={styles.searchWrap}>
            <View style={styles.searchIcon}>{Icons.search}</View>
            <TextInput
              placeholder="Search professionals..."
              placeholderTextColor="#8c8c8c"
              value={search}
              onChangeText={setSearch}
              style={[styles.searchInput, dynamicStyles.searchInput]}
            />
          </View>
        </View>

        {/* Scrollable Banner Carousel */}
        <View style={styles.bannerContainer}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / 332); // 320 + 12 gap
              setBannerIndex(currentIndex);
            }}
            contentContainerStyle={styles.bannerScrollContent}
          >
            {BANNER_DATA.map((banner) => (
              <ImageBackground
                key={banner.id}
                style={styles.bannerCard}
                imageStyle={{ borderRadius: 16 }}
                source={banner.image}
              >
                <View style={styles.bannerImageOverlay} />
                <ThemedText style={styles.bannerText}>
                  {banner.title}
                </ThemedText>
              </ImageBackground>
            ))}
          </ScrollView>

          {/* Banner Indicators */}
          <View style={styles.bannerIndicators}>
            {BANNER_DATA.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === bannerIndex
                    ? styles.indicatorActive
                    : styles.indicatorInactive,
                ]}
                onPress={() => {
                  setBannerIndex(index);
                  bannerScrollRef.current?.scrollTo({
                    x: index * 332,
                    animated: true,
                  });
                }}
              />
            ))}
          </View>
        </View>


        {/* Tabs */}
        <View style={styles.tabsRow}>
          {(['Recommended', 'Packages', 'Professionals'] as const).map(
            (tab) => {
              const active = tab === activeTab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabButton,
                    active ? styles.tabActive : styles.tabInactive,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.tabLabel,
                      active
                        ? styles.tabLabelActive
                        : styles.tabLabelInactive,
                    ]}
                    numberOfLines={1}
                  >
                    {tab}
                  </ThemedText>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        {/* Upcoming */}
        <View style={styles.section}>
          <ThemedText
            style={styles.sectionTitle}
          >
            Upcoming
          </ThemedText>

          <View style={styles.upcomingCard}>
            <View style={styles.dateBlock}>
              <ThemedText style={styles.dateDay}>19</ThemedText>
              <ThemedText style={styles.dateMonth}>Oct</ThemedText>
            </View>

            <View style={styles.upcomingInfo}>
              <ThemedText
                style={styles.serviceTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Basic Pedicure with Paty
              </ThemedText>
              <ThemedText style={styles.serviceTime}>
                Tuesday, 04:30pm
              </ThemedText>
            </View>

            <TouchableOpacity style={styles.editWrap}>
              <ThemedText style={styles.editText}>Edit</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Professionals / Recommended */}
        <View style={styles.section}>
          <ThemedText
            style={[styles.sectionTitle, dynamicStyles.sectionTitle]}
          >
            {activeTab === 'Recommended' ? 'Recommended' : activeTab}
          </ThemedText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesRow}
            scrollEventThrottle={16}
          >
            {profileSlides.map((i) => (
              <Link
                key={i.id}
                href={{
                  pathname: '/pages/ProfileDetail',
                  params: {
                    id: i.id,
                  },
                }}
                asChild
              >
                <TouchableOpacity
                  style={styles.salonCard}
                  activeOpacity={0.85}
                >
                  <ImageBackground
                    style={styles.salonImage}
                    source={i.profile}
                  />

                  <View style={styles.salonBody}>
                    <ThemedText
                      style={styles.salonName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {i.shop}
                    </ThemedText>
                    <ThemedText
                      style={styles.salonSubtitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {i.designation}
                    </ThemedText>
                    <ThemedText style={styles.salonMeta}>
                      Rating: {i.star} · $$
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollInner: {
    paddingBottom: 44,
  },
  topbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  hamburger: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 2,
  },
  hamLine: {
    height: 2.5,
    backgroundColor: '#333',
    width: '100%',
    borderRadius: 2,
    marginVertical: 3,
  },
  appTitle: {
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profile: {
    width: '100%',
    height: '100%',
  },

  greetingRow: {
    marginBottom: 18,
  },
  greeting: {
    fontWeight: '600',
    marginBottom: 12,
  },
  greetingName: {
    color: ACCENT,
    fontWeight: '700',
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: '#111',
  },

  bannerContainer: {
    marginBottom: 24,
  },
  bannerScrollContent: {
    paddingHorizontal: 16,
  },
  bannerCard: {
    width: 320,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#7b5e57',
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  bannerImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  indicatorActive: {
    backgroundColor: ACCENT,
    width: 24,
  },
  indicatorInactive: {
    backgroundColor: '#ddd',
  },

  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: ACCENT,
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#ddd',
  },
  tabLabel: {
    fontWeight: '600',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: '#fff',
  },
  tabLabelInactive: {
    color: '#333',
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 14,
  },

  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  dateBlock: {
    width: 64,
    borderRadius: 8,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginRight: 12,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  dateMonth: {
    fontSize: 12,
    color: '#111',
    marginTop: 2,
  },
  upcomingInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontWeight: '700',
  },
  serviceTime: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  editWrap: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  editText: {
    color: ACCENT,
    fontWeight: '700',
    fontSize: 13,
  },

  servicesRow: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 10
  },
  salonCard: {
    height: 220,
    borderRadius: 12,
    paddingBottom:10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  salonImage: {
    height: 110,
    width: '100%',
    backgroundColor: '#d9cfc9',
    justifyContent: 'flex-end',
  },
  salonBody: {
    padding: 12,
    justifyContent: 'space-between',
    flex: 1,
  },
  salonName: {
    fontWeight: '700',
  },
  salonSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  salonMeta: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
});
