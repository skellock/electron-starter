import * as React from 'react'
import { SampleTabs, SampleTabType } from './sample-tabs'
import { LongTab } from '../long-tab/long-tab'
import { DogTab } from '../dog-tab/dog-tab'
import { Flex } from 'rebass'
import { Header } from '../header/header'
import * as Store from 'electron-store'

// a sample store
const store = new Store()

interface WelcomeScreenState {
  tab: SampleTabType
}

export class WelcomeScreen extends React.Component<{}, WelcomeScreenState> {
  state: WelcomeScreenState = {
    tab: 'one'
  }

  componentDidMount() {
    // grab the persisted tab if we have one
    const tab = store.get('tab') || 'one'
    this.setState({ tab })
  }

  setTab = (tab: SampleTabType) => {
    // persist the store... pretty trivial example, but ya, it's that easy.
    // Probably not the best idea to hit disk everytime you change a tab, but
    // if you're gunning for a prototype, everything is fair game.
    store.set('tab', tab)
    this.setState({ tab })
  }

  render() {
    return (
      <Flex column flex={1}>
        <Header />
        <SampleTabs tab={this.state.tab} onChangeTab={this.setTab} />
        {this.state.tab === 'one' && <DogTab />}
        {this.state.tab === 'two' && <LongTab />}
      </Flex>
    )
  }
}
