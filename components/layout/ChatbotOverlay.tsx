'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export function ChatbotOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hi! Quick question about competitors? Ask me here or visit the full chat page.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    // For demo, redirect to full chat page
    window.location.href = '/chat';
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Overlay Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] glass rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in-scale">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/40 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h3 className="font-semibold">Quick Chat</h3>
            <p className="text-xs opacity-90">Ask about competitors</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/40">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Or{' '}
              <a href="/chat" className="text-primary hover:underline">
                open full chat
              </a>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
