import {
  MessageAPIResponseBase,
  TextMessage,
  WebhookEvent,
} from '@line/bot-sdk'
import { Hono } from 'hono'
import { getInProgressRecord } from './d1/d1'
import { handleDisplayAll } from './service/displayListService'
import { handleRegister, handleStartRegister } from './service/registerService'
import { handleStatistics } from './service/statisticsService'
import { MESSAGE, START_MESSAGE } from './util/constants'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/api/webhook', async c => {
  const data = await c.req.json()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const events: WebhookEvent[] = (data as any).events
  const accessToken: string = c.env.CHANNEL_ACCESS_TOKEN

  await Promise.all(
    events.map(async (event: WebhookEvent) => {
      try {
        await textEventHandler(event, accessToken, c.env.DB)
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err)
        }
        return c.json({
          status: 'error',
        })
      }
    }),
  )
  return c.json({ message: 'ok' })
})

const textEventHandler = async (
  event: WebhookEvent,
  accessToken: string,
  DB: D1Database,
): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return
  }

  const { replyToken } = event
  const { text } = event.message
  const userId = event.source.userId

  if (userId === undefined) {
    return
  }

  let responseText = ''
  if (text === START_MESSAGE.STATISTICS) {
    responseText = await handleStatistics(DB, userId)
  } else if (text === START_MESSAGE.DISPLAY_All) {
    responseText = await handleDisplayAll(DB, userId)
  } else if (text === START_MESSAGE.REGISTER) {
    responseText = await handleStartRegister(DB, userId)
  } else if (getInProgressRecord(DB, userId) !== null) {
    responseText = await handleRegister(DB, userId, text)
  } else {
    responseText = MESSAGE.DEFAULT_REPLY
  }

  const response: TextMessage = {
    type: 'text',
    text: responseText,
  }
  await fetch('https://api.line.me/v2/bot/message/reply', {
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [response],
    }),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}

export default app
