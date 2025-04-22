import { createAPIFileRoute } from '@tanstack/react-start/api'
import { getEvent } from 'vinxi/http'

import { transports } from '@/utils/demo.sse'

export const APIRoute = createAPIFileRoute('/api/messages')({
  // @ts-expect-error demo
  POST: async ({ request, params }) => {
    const body = await request.json()
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('sessionId') as string
    const transport = transports[sessionId]


    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (transport) {
      try {
        getEvent().node.res.statusCode = 200
        await transport.handleMessage(body)
      } catch (error) {
        getEvent().node.res.end('Error handling message')
      }
    } else {
      getEvent().node.res.end('No transport found for sessionId')
    }
  },
})
