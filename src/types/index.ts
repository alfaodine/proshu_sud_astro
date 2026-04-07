export interface ServiceDefinition {
  slug: string;
  title: string;
  iconId: string;
  description: string[];
  price: number;
  priceLabel: string;
  fullServicePrice?: number;
  fullServiceList: string[];
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  comment: string;
  file?: File;
}

export interface Testimonial {
  title: string;
  text: string;
  author: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
