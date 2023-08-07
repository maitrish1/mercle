import { Inter } from 'next/font/google'
import { channels, messageCountList } from './data'
import EngagementMessagesOverTime from './EngageMessagesOverTime'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
       <EngagementMessagesOverTime
      messageCountList={messageCountList}
      channels={channels}
    />
    </>
  )
}
