import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// Chat steps (questions and answers)
const steps = [
  {
    id: "1",
    message: "Welcome to MarxBid Help! How can I assist you?",
    trigger: "options",
  },
  {
    id: "options",
    options: [
      { value: "bid", label: "How do I place a bid?", trigger: "bid" },
      { value: "list", label: "How to list an item?", trigger: "list" },
      { value: "payment", label: "Is payment safe?", trigger: "payment" },
      { value: "increment", label: "Minimum bid increment?", trigger: "increment" },
      { value: "contact", label: "Contact Support", trigger: "contact" },
    ],
  },
  {
    id: "bid",
    message: "Go to the item page and click 'Place Bid'. Enter your amount and confirm.",
    trigger: "options",
  },
  {
    id: "list",
    message: "Go to your profile and click 'List Item'. Fill the form and upload images.",
    trigger: "options",
  },
  {
    id: "payment",
    message: "Yes! Payments are handled securely via Razorpay with 256-bit encryption.",
    trigger: "options",
  },
  {
    id: "increment",
    message: "Each item has a minimum bid increment, usually ₹50 or ₹100.",
    trigger: "options",
  },
  {
    id: "contact",
    message: "You can email us at support@snapauction.com or use the chat form on our Contact page.",
    trigger: "options",
  },
];

// Theme for chatbot
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica",
  headerBgColor: "#3b82f6",
  headerFontColor: "#fff",
  headerFontSize: "16px",
  botBubbleColor: "#3b82f6",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#333",
};

const HelpChatbot = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-72">
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Auction Help"
          steps={steps}
          floating={true}
        />
      </ThemeProvider>
    </div>
  );
};

export default HelpChatbot;
