import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View , TouchableHighlight, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';

type Props = {
  item: Object,
  onClick: Function,
  shouldShowDrawer: bool,
}

type State = {
  showDrawer: bool,
  messageSource: string,
  isDateTimePickerVisible: bool,
  currentDatePicked: num,
}

const MILISECS_IN_HOUR = 3600000;

export default class ContactItem extends React.Component {
  constructor(props) {
    super(props);
    let time = new Date();
    this.state = {
      messageSource: '',
      currentDatePicked: time.getTime() + MILISECS_IN_HOUR,
    };
  }

  _showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true,
    });
  }

  _handleDatePicked = (date) => {
    this.setState({ isDateTimePickerVisible: false, currentDatePicked: date.getTime()});
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false});

  _getDrawer = () => {
    if (!this.props.shouldShowDrawer) {
      return <View></View>;
    }
    let currentDateObj = new Date(this.state.currentDatePicked);
    let readableTime = "  " + currentDateObj
      .toString().slice(0, currentDateObj.toString().lastIndexOf(":"));
    //this.props.onClick(this.props.item, this.state.messageSource, this.state.currentDatePicked);
    return (
      <View>
        <TouchableOpacity onPress={this._showDateTimePicker} style={styles.drawerContainer}>
          <Icon
              name='timer'
              size={24}
              color='black'/>
            <Text style={styles.drawerText}>
              {this.state.messageSource + ' '}
              will arrive at
              <Text style={styles.drawerDateText}>
                {readableTime}
              </Text>
            </Text>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            mode={'datetime'}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            is24Hour={true}
            date={currentDateObj}
            titleIOS={"When will " + this.props.item.key + " get the "+ this.state.messageSource + "?"}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let drawer = this._getDrawer();
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.contact}>
            <Icon
                name='person'
                size={24}
                color='black'/>
            <Text style={styles.item}>
              {this.props.item.key}
            </Text>
          </View>
          <View style={styles.inline}>
            <View style={styles.icon}>
              <Icon
                name='videocam'
                onPress={(event) => {
                  this.props.onClick(this.props.item, 'Video', this.state.currentDatePicked);
                  this.setState((prevState, props) => {
                    return {
                      messageSource: 'Video',
                      isDateTimePickerVisible: true,
                    };
                  });
                }}
                size={24}
                color='red' />
            </View>
            <View style={styles.icon}>
              <Icon
                name='camera-alt'
                onPress={(event) => {
                  this.props.onClick(this.props.item, 'Picture', this.state.currentDatePicked);
                  this.setState((prevState, props) => {
                    return {
                      messageSource: 'Picture',
                      isDateTimePickerVisible: true,
                    };
                  });
                }}
                size={24}
                color='blue'/>
            </View>
            <View style={styles.icon}>
              <Icon
                name='mic'
                onPress={(event) => {
                  this.props.onClick(this.props.item, 'Audio', this.state.currentDatePicked);
                  this.setState((prevState, props) => {
                    return {
                      messageSource: 'Audio',
                      isDateTimePickerVisible: true,
                    };
                  });
                }}
                size={24}
                color='purple'/>
            </View>
            <View style={styles.icon}>
              <Icon
                name='sms'
                onPress={(event) => {
                  this.props.onClick(this.props.item, 'Text', this.state.currentDatePicked);
                  this.setState((prevState, props) => {
                    return {
                      messageSource: 'Text',
                      isDateTimePickerVisible: true,
                    };
                  });
                }}
                size={24}
                color='green'/>
            </View>
          </View>
        </View>
        {drawer}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDECEB',
    borderRadius: 15,
    borderWidth: 0.5,
    margin: 5,
    width: 350,
    flexDirection: 'row',
    justifyContent:'space-between',
    shadowOffset:{  width: 3,  height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  drawerText: {
    fontSize: 14,
    marginLeft: 5,
  },
  drawerDateText: {
    fontWeight: 'bold',
  },
  drawerContainer: {
    alignSelf: 'center',
    backgroundColor: '#dae3e8',
    borderRadius: 15,
    borderWidth: 0.3,
    margin: 5,
    marginTop: 2,
    width: 340,
    height: 50,
    shadowOpacity: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 2,
    paddingLeft: 10,
    paddingTop: 14,
  },
  item: {
    fontSize: 16,
    paddingTop: 14,
    width: 230,
  },
  inline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'flex-end',
    paddingRight: 20,
    marginBottom: 2,
  },
  contact: {
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
  }
});
