import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

function OnBoardingScreen() {
const {width, height} = useWindowDimensions();
  
const slides = [
    {
        id : '1',
        image : Images.Women,
        background: Images.Background,
        title : 'Welcome to The Galery Salon!',
        subtitle: 'Follow the steps to shedule your next appointment with us.'
    }
]
const BackHeigth = height/1.5;
const WomenHeigth = height/2.5;
const womenPosition = height/6;
const BoxWidth = width/2;
const titlePosition = height/3.5;
const titleSize = 30%height;

const subtitlePosition =  height/5;
const subtitleSize = 20%height;

const Styles = StyleSheet.create({
  titleContainer: {
    fontSize: 20,
    top: 40,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight:'bold',
    zIndex:1,
  },
  background:{
    height:BackHeigth,
    width,
    top: 0,
    zIndex:0
  },

  womenImage: {
    height: WomenHeigth,
    width,
    top: womenPosition,
    position: 'absolute',
    zIndex:1
  },
  titile:{
    fontSize: titleSize,
    lineHeight: 40,
    bottom:titlePosition,
    textAlign:'center',
    position: 'absolute',
     zIndex:6
  },
  subtitle:{
    textAlign:'center',
    position: 'absolute',
    bottom: subtitlePosition,
    fontSize: subtitleSize,
    fontWeight: 'normal'
  },
  skipLink:{
    bottom: 50,
    width: BoxWidth,
    height:70,
    left: 20,
    fontSize: 20,
    position:'absolute',
    justifyContent:'center'
   
  },
  skipText:{
    color:'#FDCCC5',
    fontWeight: 'normal',
    left: 50
  },
  startLink:{
   backgroundColor:'#FDCCC5',
    width: BoxWidth, 
    height:70,
    right: 20,
    bottom: 50,
    borderRadius:20,
    position: 'absolute',
    justifyContent:'center'
  },
  start:{
    fontSize: 20,
    textAlign:'center',
    color:'white'
  }
});

    return (
    <View style={{width, height, backgroundColor:"#fff"}}>
        <ThemedText style={Styles.titleContainer}>MeTime</ThemedText>
        <View>
        <Image 
        style={Styles.womenImage}
        source={slides[0].image}
        />
        <Image 
        style={Styles.background}
        source={slides[0].background}
        />
        </View>
        <ThemedText 
         style={Styles.titile}
         type='title'>{slides[0].title}</ThemedText>
         <ThemedText 
         style={Styles.subtitle}
        type='subtitle'>{slides[0].subtitle}</ThemedText>
          
          <Link href="/(tabs)" asChild>
          <View style={Styles.skipLink}>
            <ThemedText
            style={Styles.skipText}
            type="subtitle" >skip</ThemedText>
          </View>
        </Link>
         <Link href="/onBoarding/Screens" asChild>
         <Pressable style={Styles.startLink}>
            <ThemedText style={Styles.start}>start</ThemedText>
        </Pressable>
        </Link>
    </View>
    );
}

export default OnBoardingScreen;