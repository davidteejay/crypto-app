import React, { useState, useEffect } from 'react';
import {
  Platform, StatusBar, StyleSheet, View, Dimensions, ScrollView, RefreshControl,
  Modal, Text, Button
} from 'react-native';
import {
  Header, Body, List, ListItem, Badge, Left, Right
} from 'native-base'
import { Provider, connect } from 'react-redux'

import { closeModal, fetchAllData, selectData } from './src/actions'
import store from './src/store'

const App = props => {
  useEffect(() => {
    props.fetchAllData()
  }, [])

  const { selectedItem } = props

  return (
    <View style={styles.cover}>
      <Header noLeft>
        <Body>
          <Text style={{ ...styles.title, color: '#fff' }}>Crypto App</Text>
        </Body>
      </Header>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl
          onRefresh={props.fetchAllData}
          refreshing={props.loading}
        />}
      >
        <List>
          {props.items.map(item => (
            <ListItem
              noIndent
              key={item.id}
              onPress={() => props.selectData(item)}
              // style={styles.listItem}
            >
              <Left style={{ alignItems: 'center' }}>
                <Badge style={{ backgroundColor: 'black' }}>
                  <Text style={{ color: 'white' }}>{item.symbol}</Text>
                </Badge>
                <Text style={{ fontSize: 16, marginLeft: 10 }}>{item.name}</Text>
              </Left>
              <Right>
                {item.tags.map((tag, i) => (
                  <Badge key={i} success>
                    <Text style={{ color: 'white' }}>{tag}</Text>
                  </Badge>
                ))}
              </Right>
            </ListItem>
          ))}
        </List>
      </ScrollView>
      <Modal
        visible={props.modalVisible}
        onRequestClose={props.closeModal}
        animated
        animationType="fade"
        transparent
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#0005',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: Dimensions.get('screen').width - 40,
              // height: Dimensions.get('screen').height - 100,
              backgroundColor: '#fff',
              justifyContent: 'space-between',
              borderRadius: Platform.OS === 'ios' ? 15 : 0,
            }}
          >
            {selectedItem && (
              <ScrollView style={{ maxHeight: Dimensions.get('screen').height - 150, padding: 20 }}>
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingVertical: 10,
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                  borderStyle: 'solid'
                }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Badge style={{ backgroundColor: 'black' }}>
                      <Text style={{ color: 'white' }}>{selectedItem.symbol}</Text>
                    </Badge>
                    <Text style={{ ...styles.title, marginLeft: 10, fontSize: 20 }}>{selectedItem.name}</Text>
                  </View>
                  <View>
                    {selectedItem.tags.map((tag, i) => (
                      <Badge key={i} success>
                        <Text style={{ color: 'white' }}>{tag}</Text>
                      </Badge>
                    ))}
                  </View>
                </View>
                <List>
                  <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>CMC Rank</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#868686' }}>{selectedItem.cmc_rank}</Text>
                    </View>
                  </ListItem>
                  <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>Market Pairs</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#868686' }}>{selectedItem.num_market_pairs}</Text>
                    </View>
                  </ListItem>
                </List>
                <Text style={{ ...styles.title, alignSelf: 'flex-start', marginVertical: 10 }}>Supply</Text>
                <List>
                  <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>Circulating Supply</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#868686' }}>{selectedItem.circulating_supply}</Text>
                    </View>
                  </ListItem>
                  <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>Max Supply</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#868686' }}>{selectedItem.max_supply}</Text>
                    </View>
                  </ListItem>
                  <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>Total Supply</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#868686' }}>{selectedItem.total_supply}</Text>
                    </View>
                  </ListItem>
                </List>
                {selectedItem.quote.USD && (
                  <View>
                    <Text style={{ ...styles.title, alignSelf: 'flex-start', marginVertical: 10 }}>Quote</Text>
                    <List>
                      <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text>Price</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#868686' }}>{selectedItem.quote.USD.price}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text>Market Cap</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#868686' }}>{selectedItem.quote.USD.market_cap}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text>Volume (24H)</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#868686' }}>{selectedItem.quote.USD.volume_24h}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text>Percent Change (1H)</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#868686' }}>{selectedItem.quote.USD.percent_change_1h}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text>Percent Change (7d)</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#868686' }}>{selectedItem.quote.USD.percent_change_7d}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text>Percent Change (24H)</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#868686' }}>{selectedItem.quote.USD.percent_change_24h}</Text>
                        </View>
                      </ListItem>
                    </List>
                  </View>
                )}
              </ScrollView>
            )}
            <Button onPress={props.closeModal} title="Close" color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000'
  }
});

const mapStateToProps = state => ({
  ...state.app
})

const ConnectedApp = connect(mapStateToProps, {
  closeModal, fetchAllData, selectData
})(App)

const AppContainer = props => (
  <View style={{ flex: 1 }}>
    {Platform.OS === 'ios' ? <StatusBar barStyle="default" /> : <StatusBar barStyle="dark-content" />}
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </View>
);

export default AppContainer;
