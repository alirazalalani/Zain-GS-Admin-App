import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfileItem from '../../components/ProfileItem';
import {Avatar} from '@rneui/themed';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {apiMiddleware} from '../../utils/HelperFunction';
import {successMessage} from '../../utils/ErrorMsg';

const ProfileScreen = () => {
  const [user, setUser] = useState<any>({});

  const getProfile = async () => {
    const getItems: any = await AsyncStorage.getItem('userData');
    const parsedItem: any = await JSON.parse(getItems);

    setUser(parsedItem);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, []),
  );
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLOR.PRIMARY_COLOR}
        barStyle={'light-content'}
      />
      <View
        style={{
          paddingHorizontal: responsiveWidth(5.2),
          justifyContent: 'center',
          alignItems: 'center',
          height: responsiveHeight(40),
          backgroundColor: COLOR.PRIMARY_COLOR,
        }}>
        <Avatar
          size={responsiveHeight(20)}
          rounded
          source={{
            uri: user.image
              ? user.image
              : 'https://randomuser.me/api/portraits/men/36.jpg',
          }}
        />
        <View
          style={{justifyContent: 'center', marginTop: responsiveHeight(1.5)}}>
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(2.2),
              fontFamily: FONTS.POPPINS_SEMI_BOLD,
              letterSpacing: 0.5,
              textAlign: 'center',
            }}>
            {user?.username}
            {'\n'}
            <Text
              style={{
                color: COLOR.GREY,
                fontSize: responsiveFontSize(1.8),
                fontFamily: FONTS.POPPINS_LIGHT,
                letterSpacing: 0.5,
                textAlign: 'center',
              }}>
              {user?.email}
            </Text>
          </Text>
        </View>
      </View>

      <ProfileItem
        name={'Notification'}
        Img={IMAGES.Orders}
        onPress={() => setModalVisible(true)}
      />
      {/* <ProfileItem
        name={'Orders'}
        Img={IMAGES.Orders}
        onPress={() => {
          navigation.navigate('MyOrders');
        }}
      />
      <ProfileItem
        name={'My Details'}
        onPress={() => {
          navigation.navigate('UserDetails');
        }}
        Img={IMAGES.MyDetails}
      /> */}

      {/* <ProfileItem
        name={'Notification'}
        // img={require('../../assets/img/notification.png')}
      /> */}
      {/* <ProfileItem name={'Help'} Img={IMAGES.Help} />
      <ProfileItem name={'About'} Img={IMAGES.About} /> */}
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
          marginBottom: responsiveHeight(2),
        }}>
        <Button
          title={'Log Out'}
          isLoading={isLoading}
          style={{
            width: '90%',
          }}
          onPress={async () => {
            setIsLoading(true);
            await AsyncStorage.removeItem('userData');
            navigation.replace('Stack');
            setIsLoading(false);
          }}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Send Notification</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  placeholderTextColor={COLOR.GREY}
                  value={title}
                  onChangeText={setTitle}
                />

                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Description"
                  placeholderTextColor={COLOR.GREY}
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={4}
                />

                <Button
                  title="Send"
                  isLoading={isSending}
                  style={{width: '100%', marginTop: responsiveHeight(1)}}
                  onPress={async () => {
                    if (title && description) {
                      setIsSending(true);
                      const response = await apiMiddleware({
                        url: '/notification/send',
                        method: 'post',
                        data: {
                          title: title,
                          body: description,
                        },
                        navigation: navigation,
                      });

                      setIsSending(false);

                      if (response) {
                        setModalVisible(false);
                        setTitle('');
                        setDescription('');
                        successMessage('Notification sent successfully');
                      }
                    } else {
                      // Optional: Show alert if empty
                    }
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND_COLOR,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    marginBottom: 15,
    color: COLOR.PRIMARY_COLOR,
  },
  input: {
    width: '100%',
    backgroundColor: COLOR.TEXTFIELD_BACKGROUND,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: responsiveFontSize(1.8),
    color: COLOR.SUB_HEADING,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
