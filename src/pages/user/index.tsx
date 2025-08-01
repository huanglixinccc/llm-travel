import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import UserNavBar from '@/components/mine/userNavBar'
import { MOCK_CHAT_HISTORY, MOCK_TRAVEL_PLANS, MOCK_USER_INFO } from '@/mock'
import './index.less'

type TabType = 'chat' | 'travel'

export default function Index () {
  const [activeTab, setActiveTab] = useState<TabType>('chat')

  useLoad(() => {
    console.log('Page loaded.')
  })

  // 开始新对话
  const startNewChat = () => {
    console.log('开始新对话')
    // TODO: 跳转到聊天页面
  }

  // 进入设置页面
  const goToSettings = () => {
    Taro.navigateTo({
      url: '/pages/settings/index'
    })
  }

  // 渲染历史对话列表
  const renderChatHistory = () => {
    if (MOCK_CHAT_HISTORY.length === 0) {
      return (
        <View className='empty-content'>
          <Text className='empty-text'>暂无历史对话</Text>
          <Text className='empty-desc'>快去开始一段新的对话吧～</Text>
        </View>
      )
    }

    return (
      <View className='content-list'>
        {MOCK_CHAT_HISTORY.map(chat => (
          <View key={chat.id} className='chat-item'>
            <View className='chat-content'>
              <Text className='chat-title'>{chat.title}</Text>
              <View className='chat-images'>
                {chat.images.map((img, index) => (
                  <Image key={index} className='chat-image' src={img} />
                ))}
              </View>
            </View>
            <View className='chat-info'>
              <Text className='chat-messages'>{chat.messageCount}条对话</Text>
              <Text className='chat-date'>{chat.date}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }

  // 渲染行程列表
  const renderTravelPlans = () => {
    if (MOCK_TRAVEL_PLANS.length === 0) {
      return (
        <View className='empty-content'>
          <Text className='empty-text'>暂无行程规划</Text>
          <Text className='empty-desc'>快去创建一个新的行程吧～</Text>
        </View>
      )
    }

    return (
      <View className='content-list'>
        {MOCK_TRAVEL_PLANS.map(plan => (
          <View key={plan.id} className='travel-item'>
            <Image className='travel-thumbnail' src={plan.thumbnail} />
            <View className='travel-content'>
              <View className='travel-tags'>
                {plan.tags.map(tag => (
                  <View key={tag} className='travel-tag'>
                    <Text className='travel-tag-text'>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text className='travel-title'>{plan.title}</Text>
              <View className='travel-info'>
                <Text className='travel-duration'>{plan.duration}</Text>
                <Text className='travel-spots'>{plan.spotCount}个地点</Text>
              </View>
              <View className='travel-places'>
                <Text className='travel-places-text'>
                  {plan.places.join(' · ')}...
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View className='user-wrapper'>
      <UserNavBar />
      
      {/* 用户信息区域 */}
      <View className='user-info-section'>
        <View className='user-info'>
          <View className='user-avatar'>
            <Text className='avatar-emoji'>{MOCK_USER_INFO.avatar}</Text>
          </View>
          <View className='user-details'>
            <Text className='user-name'>{MOCK_USER_INFO.nickname}</Text>
            <Text className='user-companion'>
              兔兔与你相识{MOCK_USER_INFO.companionDays}天了
            </Text>
          </View>
          <View className='user-settings' onClick={goToSettings}>
            <View className='settings-icon'>
              <Text>⚙️</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tab切换 */}
      <View className='tab-section'>
        <View 
          className={`tab-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <Text className='tab-text'>历史对话</Text>
          {activeTab === 'chat' && <View className='tab-line' />}
        </View>
        <View 
          className={`tab-item ${activeTab === 'travel' ? 'active' : ''}`}
          onClick={() => setActiveTab('travel')}
        >
          <Text className='tab-text'>我的行程</Text>
          {activeTab === 'travel' && <View className='tab-line' />}
        </View>
      </View>

      {/* 内容区域 */}
      <View className='content-section'>
        {activeTab === 'chat' ? renderChatHistory() : renderTravelPlans()}
        
        {/* 在线状态 */}
        {MOCK_USER_INFO.isOnline && (
          <View className='online-status'>
            <Text className='online-text'>我是有底线的</Text>
          </View>
        )}
      </View>

      {/* 开始新对话按钮 */}
      <View className='new-chat-btn' onClick={startNewChat}>
        <Text className='new-chat-text'>开始新对话</Text>
      </View>
    </View>
  )
}
