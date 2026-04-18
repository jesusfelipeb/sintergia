export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Tier {
  name: string;
  slug: string;
  price: string;
  monthly: string;
  features: string[];
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
