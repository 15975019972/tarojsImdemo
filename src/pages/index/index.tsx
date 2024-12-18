import { Component, PropsWithChildren, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { getSDK, CbEvents, CallbackEvent } from '@openim/client-sdk';
import './index.scss'

const IMSDK = getSDK()
export default class Index extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () {

    IMSDK.on(CbEvents.OnConnecting, handleConnecting);
    IMSDK.on(CbEvents.OnConnectFailed, handleConnectFailed);
    IMSDK.on(CbEvents.OnConnectSuccess, handleConnectSuccess);

    IMSDK.login({
      userID: '9069085873',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI5MDY5MDg1ODczIiwiUGxhdGZvcm1JRCI6NiwiZXhwIjoxNzQyMjY3NzMwLCJuYmYiOjE3MzQ0OTE0MzAsImlhdCI6MTczNDQ5MTczMH0.TAx52ao-sqeKJAUuTKCbTWqfnV0Vukwa8QMCnLae_L4',
      platformID: 6,
      wsAddr: '',
      apiAddr: '',
    }).then(res => {
      console.log('res', res)
    })
      .catch(err => {
        console.log('err', err);
      })

    function handleConnecting() {
      console.log('hello')
      // Connecting...
    }

    function handleConnectFailed({ errCode, errMsg }: CallbackEvent) {
      // Connection failed ❌
      console.log(errCode, errMsg);
    }

    function handleConnectSuccess() {
      console.log('handleConnectSuccess')
      // Connection successful ✅
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async sendMsg () {
    console.log('getSDK', getSDK);
    const message = (await IMSDK.createTextMessage('hello openim')).data;

    IMSDK.sendMessage({
      recvID: '3893196195',
      groupID: '',
      message,
    })
      .then(() => {
        // Message sent successfully ✉️
        console.log('msg success')
      })
      .catch(err => {
        // Failed to send message ❌
        console.log(err);
      });
  }

  render () {
    return (
      <View className='index'>
        <Text onClick={this.sendMsg}>Hello world!</Text>
      </View>
    )
  }
}
