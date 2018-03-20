import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View , FlatList, ActivityIndicator} from 'react-native';
import { Button} from 'react-native-elements';
import ContactItem from '../components/ContactItem';

export default class PreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {contactsList: [], isSendEnabled: false};
  }

  componentDidMount = () => {
    this._genContactsList().then(value => {
      this.setState({
        contactsList: value,
        predictionDetails: {
          contact: {},
          deliveryChannel: '',
          deliveryTime: new Date().getTime(),
        }
      })
    });
  }

  _genContactsList = async () => {
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      return;
    }
    const allContacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
      ],
      pageSize: 2000,
      pageOffset: 0,
    });
    let rawContactsArray =
      allContacts.data.filter(
        (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0 &&
          contact.phoneNumbers[0].digits &&
          (contact.firstName + contact.firstName) !== ''
      );
    let contactFinal = rawContactsArray.map((rawContact) => {
      return {
        phoneNumber: rawContact.phoneNumbers[0].digits,
        firstName: rawContact.firstName,
        lastName: rawContact.lastName,
      }
    });
    return this._filterAndStructureContacts(contactFinal);
  }
  
  _filterAndStructureContacts = (contactsArray: Array<any>) => {
    sorted = contactsArray.sort((contactA, contactB) => {
      let nameA = (contactA.firstName + contactA.lastName).toUpperCase();
      let nameB = (contactB.firstName + contactB.lastName).toUpperCase();
      return nameA < nameB ? -1 : 1;
    });
    return sorted.slice(200);
  }

  _onContactClick = (contact, deliveryChannel, deliveryTime) => {
    let predictionDetails = {
     contact: contact,
     deliveryChannel: deliveryChannel,
     deliveryTime: deliveryTime,
    }
    this.setState({
      predictionDetails: predictionDetails,
      isSendEnabled: true,
    })
  }
  
  _sendPrediction = () => {
    console.log(this.state.predictionDetails);
  }

  render() {
    if (this.state.contactsList &&  this.state.contactsList.length > 0) {
    //  let processedList = this._filterAndStructureContacts(this.state.contactsList);
      let displayArr = [];
      this.state.contactsList.forEach(contact => {
        displayArr.push({
          contact: contact,
          key: contact.firstName + ' ' + contact.lastName,
        });
      })
      return (
        <View  style={styles.container}>
          <FlatList
            style={styles.contactsList}
            data={displayArr}
            renderItem={({item}) => <ContactItem
              item={item}
              onClick={this._onContactClick}
              shouldShowDrawer={
                this.state.predictionDetails.contact.contact
                ? this.state.predictionDetails.contact.contact.phoneNumber === item.contact.phoneNumber
                : false} />}
            />
            <Button
              onPress={this._sendPrediction}
              title="Submit"
              color="white"
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              disabledStyle={styles.disabledStyle}
              disabled={!this.state.isSendEnabled}
            />
        </View>
      );
    }
    let text = "Wait, I'm predicting who your'e contacts are... There's someone with an A right ?";
    return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
          <Text>{text}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17739B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 26,
  },
  contactsList: {
    paddingVertical: 10,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  disabledStyle: {
    backgroundColor: '#C8CBC6',
  },
  buttonStyle: {
    width: 400,
    backgroundColor: '#DC6553',
  },
  search: {
    width: 100,
  },
});
