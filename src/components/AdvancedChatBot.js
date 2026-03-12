import React, { useState, useEffect, useRef } from "react";


function AdvancedChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Green Assistant Ask about Plants, Pots, Seeds or Gardening Services.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Smart Keyword-Based Knowledge Base
  const knowledgeBase = [
    
    {
      keywords: ["indoor", "inside", "home plant", "office plant"],
      response:
        "Indoor Plants 🌿 – Low-maintenance plants ideal for homes and offices. They require indirect sunlight and minimal watering.",
    },
    {
      keywords: ["outdoor", "garden", "outside", "terrace"],
      response:
        "Outdoor Plants 🌳 – Sun-loving plants suitable for gardens and open spaces. They need 5–6 hours of sunlight daily.",
    },
    {
      keywords: ["hanging", "balcony", "decorative hanging"],
      response:
        "Hanging Plants 🌼 – Perfect for balconies and compact areas. Adds beauty and saves space.",
    },
    {
      keywords: ["ceramic"],
      response:
        "Ceramic Pots 🪴 – Premium, durable and perfect for indoor decoration.",
    },
    {
      keywords: ["plastic"],
      response:
        "Plastic Pots 🪴 – Lightweight, affordable and easy to maintain.",
    },
    {
      keywords: ["wooden"],
      response:
        "Wooden Pots 🪵 – Natural finish pots suitable for outdoor landscaping.",
    },
    {
      keywords: ["fruit seed", "mango", "guava", "fruit"],
      response:
        "Fruit Seeds 🍎 – High-quality seeds for growing fresh fruits at home.",
    },
    {
      keywords: ["flower seed", "rose", "sunflower", "flower"],
      response:
        "Flower Seeds 🌸 – Bright and colorful varieties for vibrant gardens.",
    },
    {
      keywords: ["vegetable seed", "tomato", "chili", "vegetable"],
      response:
        "Vegetable Seeds 🥕 – Organic seeds for healthy home-grown vegetables.",
    },
    {
      keywords: ["lawn"],
      response:
        "Lawn Care 🌿 – Professional grass cutting and complete lawn maintenance services.",
    },
    {
      keywords: ["planting"],
      response:
        "Planting Service 🌱 – Soil preparation and proper plant installation.",
    },
    {
      keywords: ["pruning", "trim"],
      response:
        "Pruning Service ✂️ – Removing dead branches to promote healthy growth.",
    },
    {
      keywords: ["landscape", "design"],
      response:
        "Landscape Design 🏡 – Customized garden design and full maintenance support.",
    },
    {
      keywords: ["water"],
      response:
        "Watering 💧 – Most plants require watering 2–3 times per week depending on climate.",
    },
    {
      keywords: ["sunlight", "light"],
      response:
        "Sunlight ☀️ – Indoor plants need indirect light. Outdoor plants require 5–6 hours daily.",
    },
    {
      keywords: ["fertilizer", "compost"],
      response:
        "Fertilizer 🌿 – Apply organic compost once every month for healthy growth.",
    },
    {
      keywords: ["soil"],
      response:
        "Soil 🌱 – Use well-drained soil mixed with organic compost for best results.",
    },
    {
      keywords: ["pest", "insect"],
      response:
        "Pest Control 🐛 – Neem oil spray is recommended for natural plant protection.",
    },
    {
    keywords: ["china plant"],
    response: "China Plant 🌿 – A hardy indoor foliage plant known for its attractive leaves and low maintenance care."
  },
  {
    keywords: ["watermelon peperomia"],
    response: "Watermelon Peperomia 🍉 – Compact indoor plant with striped leaves resembling watermelon. Ideal for desks and shelves."
  },
  {
    keywords: ["petra croton"],
    response: "Petra Croton 🌈 – Colorful ornamental plant with vibrant red, yellow and green leaves."
  },
  {
    keywords: ["money plant variegated"],
    response: "Money Plant Variegated 🌿 – Popular indoor plant with beautiful dual-tone leaves. Easy to grow and maintain."
  },
  {
    keywords: ["aglaonema red"],
    response: "Aglaonema Red ❤️ – Stylish indoor plant with red-green foliage. Perfect for low-light areas."
  },
  {
    keywords: ["peace lily"],
    response: "Peace Lily 🤍 – Elegant flowering indoor plant that improves air quality and thrives in indirect light."
  },
  {
    keywords: ["jade mini"],
    response: "Jade Mini Plant 🌱 – Small succulent plant symbolizing prosperity. Requires minimal watering."
  },
  {
    keywords: ["money plant"],
    response: "Money Plant 🌿 – Fast-growing indoor plant ideal for home décor and air purification."
  },
  {
    keywords: ["curtain creeper"],
    response: "Curtain Creeper 🌿 – Fast-growing climbing plant ideal for walls and fences."
  },
  {
    keywords: ["turtle vine"],
    response: "Turtle Vine 🌱 – Decorative trailing plant perfect for hanging baskets and balcony décor."
  },

  // 🌸 Outdoor & Flower Plants
  {
    keywords: ["purple lavender"],
    response: "Purple Lavender 💜 – Fragrant flowering plant known for its calming aroma and beautiful purple blooms."
  },
  {
    keywords: ["colcus rainbow"],
    response: "Coleus Rainbow 🌈 – Vibrant foliage plant with colorful patterned leaves."
  },
  {
    keywords: ["phlox beauty dwarf"],
    response: "Phlox Beauty Dwarf 🌸 – Compact flowering plant producing bright and attractive blooms."
  },
  {
    keywords: ["marigold mixed"],
    response: "Marigold Mixed 🌼 – Easy-to-grow flowering plant with bright seasonal blooms."
  },

  // 🍎 Fruits
  {
    keywords: ["strawberry"],
    response: "Strawberry 🍓 – Sweet fruit plant suitable for pots and garden beds."
  },
  {
    keywords: ["watermelon"],
    response: "Watermelon 🍉 – Summer fruit plant requiring full sunlight and regular watering."
  },
  {
    keywords: ["watermelon yellow"],
    response: "Yellow Watermelon 🍈 – Unique variety with sweet yellow flesh."
  },
  {
    keywords: ["papaya"],
    response: "Papaya 🌴 – Fast-growing tropical fruit plant rich in nutrients."
  },

  // 🥕 Vegetables
  {
    keywords: ["capsicum"],
    response: "Capsicum 🌶 – Easy-to-grow vegetable plant suitable for pots and kitchen gardens."
  },
  {
    keywords: ["corn"],
    response: "Corn 🌽 – Popular crop plant requiring open sunlight and space."
  },
  {
    keywords: ["beetroot candy"],
    response: "Beetroot Candy ❤️ – Colorful root vegetable rich in nutrients."
  },
  {
    keywords: ["zucchini"],
    response: "Zucchini 🥒 – Fast-growing vegetable plant ideal for home gardens."
  },

  // 🛠 Services
  {
    keywords: ["lawn care", "maintainence"],
    response: "Lawn Care & Maintenance 🌿 – Professional grass trimming, cleaning and lawn health management."
  },
  {
    keywords: ["planting"],
    response: "Planting Service 🌱 – Soil preparation and expert plant installation support."
  },
  {
    keywords: ["pruning"],
    response: "Pruning & Maintenance ✂️ – Safe trimming to promote healthy plant growth."
  },
  {
    keywords: ["landscape"],
    response: "Landscape Design & Installation 🏡 – Customized garden layout planning and complete setup."
  }
];
  

  // 🔥 Smart Matching Function
  const getBotReply = (msg) => {
    const message = msg.toLowerCase().trim();

    for (let item of knowledgeBase) {
      for (let word of item.keywords) {
        if (message.includes(word)) {
          return item.response;
        }
      }
    }

    return "Please ask about Plants, Pots, Seeds, Services or Gardening Care 🌿";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReply = { text: getBotReply(input), sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <div className="chat-toggle" onClick={() => setOpen(!open)}><i class="fa fa-comment" aria-hidden="true"></i>

     </div>

      {open && (
        <div className="chat-container">
          <div className="chat-header">
             Green Assistant
            <span onClick={() => setOpen(false)}><i class="fa fa-times" aria-hidden="true"></i>
 </span>
          </div>

          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {typing && <div className="msg bot">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdvancedChatBot;
