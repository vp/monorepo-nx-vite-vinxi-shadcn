import type { Meta, StoryObj } from '@storybook/react';
import type React from "react"
import { useState } from "react"
import { Grid2X2, Send } from "lucide-react"
import { Button } from "@workspace/ui/components/ui/button"
import { Textarea } from "@workspace/ui/components/ui/textarea"
import { cn } from "@workspace/ui/lib/utils"

const initialMessages = [
  {
    id: 1,
    content: "Can you help me count the average number of podocytes in kidney glomerulus?",
    sender: "user",
  },
  {
    id: 2,
    content: `Here is the pipeline that I designed for you:
      1. Cell segmentation
      2. Cell classification for Podocytes.
      3. Tissue segmentation for glomerulus.
      4. Writing a script to calculate the average number of target cells in specific tissue region.
      
      You can view my generated pipeline above.`,
    sender: "bot",
  },
]

const ChatSidebar = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: input,
        sender: "user",
      },
    ])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: "This is a simulated response from the AI assistant.",
          sender: "bot",
        },
      ])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Fixed Header */}
      <div className="flex-none bg-white border-b p-4 h-16 sticky top-0 z-10">
        <span className="font-medium text-base">TissueLab Chat</span>
      </div>

      {/* Scrollable Chat Area */}
      <div className="flex-grow overflow-y-auto bg-slate-50">
        <div className="p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn("flex gap-3 max-w-[80%]", message.sender === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  {message.sender === "bot" ? (
                    <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Grid2X2 className="w-4 h-4 text-slate-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      {/* <Image src="/placeholder.svg?height=32&width=32" alt="User" width={32} height={32} /> */}
                    </div>
                  )}
                  <div
                    className={cn("rounded-2xl p-4", message.sender === "user" ? "bg-white border" : "bg-white border")}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="flex-none p-2 bg-white border-t sticky bottom-0 z-10">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[50px] max-h-[120px] resize-none flex-grow"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                handleSend(e)
              }
            }}
          />
          <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700 h-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

const meta: Meta<typeof ChatSidebar> = {
  component: ChatSidebar,
  title: 'ChatSidebar',
};
export default meta;
type Story = StoryObj<typeof ChatSidebar>;

export const Primary: Story = {
  args: {},
};
