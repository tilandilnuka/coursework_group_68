"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { productCatalog, resolveCatalogImage } from "@/data/productCatalog";

const INITIAL_MESSAGE = {
  id: 1,
  sender: "agent",
  time: "",
  text: "Hi! Tell me what kind of device you want, like budget phone, good battery, best camera, gaming phone, student tablet, or wireless earbuds.",
  products: [],
};

const QUICK_REPLIES = [
  "budget phone",
  "good battery",
  "best camera",
  "gaming phone",
  "student tablet",
  "wireless earbuds",
];

const TIME_FORMATTER = new Intl.DateTimeFormat("en-LK", {
  hour: "2-digit",
  minute: "2-digit",
});

const formatTime = () => TIME_FORMATTER.format(new Date());

const getInitialMessages = () => [
  {
    ...INITIAL_MESSAGE,
  },
];

const createInitialMessages = () => [
  {
    ...INITIAL_MESSAGE,
    time: formatTime(),
  },
];

const loadStoredMessages = () => {
  const savedHistory = window.localStorage.getItem("chatHistory");

  if (!savedHistory) {
    return createInitialMessages();
  }

  try {
    const parsedHistory = JSON.parse(savedHistory);
    if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
      return parsedHistory;
    }
  } catch {
    window.localStorage.removeItem("chatHistory");
  }

  return createInitialMessages();
};

const formatPrice = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-LK")}`;

const getNextMessageSeed = (messages) =>
  messages.reduce((maxId, message) => {
    const id = typeof message?.id === "number" ? message.id : maxId;
    return Math.max(maxId, id);
  }, 1) + 1;

const scoreProduct = (product, terms = []) => {
  const searchableText = [
    product.title,
    product.brandName,
    product.model,
    product.category,
    product.description,
    product.processor,
    product.storage,
    product.display,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return terms.reduce((score, term) => {
    if (!term) {
      return score;
    }

    return searchableText.includes(term.toLowerCase()) ? score + 1 : score;
  }, 0);
};

const rankProducts = ({
  category,
  include = [],
  exclude = [],
  sortBy = "score",
  limit = 3,
}) => {
  let filteredProducts = productCatalog.filter((product) => {
    if (category && product.category !== category) {
      return false;
    }

    const searchableText = [
      product.title,
      product.brandName,
      product.model,
      product.category,
      product.description,
      product.processor,
      product.storage,
      product.display,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return exclude.every(
      (term) => !searchableText.includes(term.toLowerCase()),
    );
  });

  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const scoreDifference =
        scoreProduct(b, include) - scoreProduct(a, include);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return a.price - b.price;
    });
  }

  return filteredProducts.slice(0, limit);
};

const RESPONSE_RULES = [
  {
    keywords: ["budget phone", "cheap phone", "affordable phone", "low price"],
    reply:
      "Here are some lower-priced phones from the catalog. These are good picks if you want solid everyday performance without moving into flagship pricing.",
    getProducts: () =>
      rankProducts({
        category: "mobile phones",
        sortBy: "price-asc",
      }),
  },
  {
    keywords: [
      "good battery",
      "battery life",
      "long battery",
      "all day battery",
    ],
    reply:
      "These picks stand out for battery life or power efficiency, so they are better for long days, travel, and heavy use.",
    getProducts: () =>
      rankProducts({
        category: "mobile phones",
        include: ["battery", "charging", "power", "full day"],
      }),
  },
  {
    keywords: ["best camera", "camera phone", "photos", "photography"],
    reply:
      "These phones are the best camera-focused options in the current catalog, especially if photos and video matter most to you.",
    getProducts: () =>
      rankProducts({
        category: "mobile phones",
        include: [
          "camera",
          "photography",
          "zoom",
          "computational",
          "pro-grade",
        ],
      }),
  },
  {
    keywords: ["gaming phone", "gaming", "performance phone", "fast phone"],
    reply:
      "These phones are better for gaming and demanding apps because they focus on performance, smooth displays, and fast chipsets.",
    getProducts: () =>
      rankProducts({
        category: "mobile phones",
        include: ["gaming", "fast", "performance", "snapdragon", "elite"],
      }),
  },
  {
    keywords: [
      "student tablet",
      "tablet for study",
      "study tablet",
      "tablet for school",
    ],
    reply:
      "These tablets fit study and note-taking use well, with a good mix of portability, screen size, and value.",
    getProducts: () =>
      rankProducts({
        category: "tablets",
        include: ["study", "notes", "learning", "portable", "value"],
      }),
  },
  {
    keywords: ["tablet", "big screen", "watch movies", "media tablet"],
    reply:
      "Here are some tablet suggestions if you want a larger screen for streaming, browsing, reading, or multitasking.",
    getProducts: () =>
      rankProducts({
        category: "tablets",
        include: ["display", "streaming", "movies", "multitasking", "screen"],
      }),
  },
  {
    keywords: ["wireless earbuds", "earbuds", "earphones", "music"],
    reply:
      "These wireless audio accessories are the closest match if you want earbuds for commuting, calls, or everyday listening.",
    getProducts: () =>
      rankProducts({
        category: "accessories",
        include: ["earbuds", "audio", "noise cancellation", "sound", "battery"],
      }),
  },
  {
    keywords: ["charging", "power bank", "charger", "fast charging"],
    reply:
      "These charging accessories are useful if you want backup power or a cleaner charging setup at your desk or bedside.",
    getProducts: () =>
      rankProducts({
        category: "accessories",
        include: ["charging", "power", "wireless", "battery"],
      }),
  },
  {
    keywords: ["apple", "iphone", "ipad"],
    reply:
      "Here are the Apple products in this catalog right now, including both phone and tablet options.",
    getProducts: () =>
      [...productCatalog]
        .filter((product) => product.brandName === "Apple")
        .sort((a, b) => a.price - b.price)
        .slice(0, 3),
  },
  {
    keywords: ["samsung", "galaxy"],
    reply:
      "These Samsung Galaxy devices are available in the catalog if you want Android options across phone and tablet categories.",
    getProducts: () =>
      [...productCatalog]
        .filter((product) => product.brandName === "Samsung")
        .sort((a, b) => a.price - b.price)
        .slice(0, 3),
  },
];

const buildResponse = (input) => {
  const normalizedInput = input.toLowerCase().trim();
  const matchedRule = RESPONSE_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalizedInput.includes(keyword)),
  );

  if (matchedRule) {
    return {
      text: matchedRule.reply,
      products: matchedRule.getProducts(),
    };
  }

  const searchTerms = normalizedInput.split(/\s+/).filter(Boolean);
  const fallbackProducts = [...productCatalog]
    .map((product) => ({
      product,
      score: scoreProduct(product, searchTerms),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.product.price - b.product.price;
    })
    .slice(0, 3)
    .map((entry) => entry.product);

  if (fallbackProducts.length > 0) {
    return {
      text: `I matched that request against the catalog and found a few relevant options for "${input}".`,
      products: fallbackProducts,
    };
  }

  return {
    text: 'I could not match that request yet. Try phrases like "budget phone", "good battery", "best camera", "gaming phone", "student tablet", "wireless earbuds", or "fast charging".',
    products: [],
  };
};

const ProductSuggestionCard = ({ product }) => (
  <Link
    href={`/products/singleProduct?productId=${product._id}`}
    className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
  >
    <div className="relative h-28 w-full bg-gray-50">
      <Image
        src={resolveCatalogImage(product.images?.[0])}
        alt={product.title}
        fill
        sizes="220px"
        className="object-contain p-3"
      />
    </div>
    <div className="space-y-2 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-600">
          {product.category}
        </span>
        <span className="text-[10px] font-medium text-gray-500">
          {product.brandName}
        </span>
      </div>
      <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
        {product.title}
      </h4>
      <p className="line-clamp-2 text-xs leading-5 text-gray-600">
        {product.description}
      </p>
      <div className="flex items-center justify-between pt-1">
        <span className="text-sm font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        <span className="text-xs font-semibold text-orange-600">View item</span>
      </div>
    </div>
  </Link>
);

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(getInitialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(getNextMessageSeed(getInitialMessages()));
  const hasHydratedRef = useRef(false);

  const getNextMessageId = () => {
    const nextId = messageIdRef.current;
    messageIdRef.current += 1;
    return nextId;
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedMessages = loadStoredMessages();
      hasHydratedRef.current = true;
      messageIdRef.current = getNextMessageSeed(storedMessages);
      setMessages(storedMessages);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      return;
    }

    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (messageText) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      return;
    }

    const userMessage = {
      id: getNextMessageId(),
      text: trimmedMessage,
      sender: "user",
      time: formatTime(),
      products: [],
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    window.setTimeout(() => {
      const response = buildResponse(trimmedMessage);
      const agentResponse = {
        id: getNextMessageId(),
        sender: "agent",
        time: formatTime(),
        text: response.text,
        products: response.products,
      };

      setMessages((prevMessages) => [...prevMessages, agentResponse]);
      setIsTyping(false);
    }, 900);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(newMessage);
  };

  const clearChatHistory = () => {
    const initialMessages = createInitialMessages();
    messageIdRef.current = 2;
    setMessages(initialMessages);
    localStorage.setItem("chatHistory", JSON.stringify(initialMessages));
  };

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen
            ? "h-[560px] w-[24rem] max-w-[calc(100vw-1.5rem)]"
            : "h-16 w-16"
        }`}
      >
        {isOpen ? (
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
              <div className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
                  AI
                </div>
                <div>
                  <h3 className="font-semibold">Shopping Assistant</h3>
                  <p className="text-xs opacity-90">
                    Instant keyword-based recommendations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-white transition-colors duration-200 hover:bg-white/20"
                aria-label="Close chat"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={chatBoxRef}
              className="chat-box flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-orange-50/40 to-white p-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] ${
                      message.sender === "user" ? "items-end" : "items-start"
                    } flex flex-col gap-2`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      <p className="text-sm leading-6">{message.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>

                    {message.sender === "agent" &&
                      Array.isArray(message.products) &&
                      message.products.length > 0 && (
                        <div className="grid w-full gap-3">
                          {message.products.map((product) => (
                            <ProductSuggestionCard
                              key={product._id}
                              product={product}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs rounded-2xl bg-gray-100 px-4 py-2 text-black">
                    <p className="text-sm">Assistant is typing...</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    disabled={isTyping}
                    onClick={() => sendMessage(reply)}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 transition-colors duration-200 hover:bg-orange-100 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  disabled={isTyping}
                  onChange={(event) => setNewMessage(event.target.value)}
                  placeholder="Try: budget phone"
                  aria-label="Type your message"
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isTyping || !newMessage.trim()}
                  className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-white transition-all duration-200 hover:from-orange-600 hover:to-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>

              <button
                onClick={clearChatHistory}
                className="mt-3 text-sm text-red-500 hover:underline"
              >
                Clear Chat History
              </button>
            </div>
          </div>
        ) : (
          <div className="group relative">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl transition-all duration-300 hover:scale-110"
              aria-label="Open shopping assistant"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>

              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
              </div>
            </button>

            <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-xl bg-black px-4 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Ask for product suggestions
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveChat;
