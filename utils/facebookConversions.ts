import axios from 'axios';
import { EventData } from '@/types/EventData';

const API_URL = `https://graph.facebook.com/v12.0/${process.env.FACEBOOK_PIXEL_ID}/events`;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

const sendEventToFacebook = async (eventData: EventData): Promise<void> => {
  try {
    await axios.post(
      API_URL,
      {
        data: [eventData],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  } catch (error) {
    console.error('Error sending event to Facebook:', error);
  }
};

export const sendAddPaymentInfoEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'AddPaymentInfo',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      currency: 'USD',
      value: 99.99,
      content_ids: ['product123'],
      content_type: 'product',
      order_id: 'order123',
      search_string: 'produto de exemplo',
      status: 'completed',
      level: 'gold',
      registration_method: 'email',
      max_rating_value: 5,
      num_items: 1,
      description: 'Descrição do evento de compra',
      content_name: 'Produto Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};

export const sendCompleteRegistrationEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'CompleteRegistration',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      status: 'completed',
      category: 'Categoria Exemplo',
      level: 'gold',
      registration_method: 'email',
      num_items: 1,
      description: 'Descrição do evento de inscrição',
      content_name: 'Inscrição Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};

export const sendContactEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'Contact',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      status: 'completed',
      category: 'Categoria Exemplo',
      level: 'gold',
      registration_method: 'email',
      num_items: 1,
      description: 'Descrição do evento de contato',
      content_name: 'Contato Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};

export const sendInitiateCheckoutEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'InitiateCheckout',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      currency: 'USD',
      value: 199.99,
      content_ids: ['product123'],
      content_type: 'product',
      order_id: 'order123',
      search_string: 'produto de exemplo',
      status: 'initiated',
      level: 'gold',
      registration_method: 'email',
      max_rating_value: 5,
      num_items: 1,
      description: 'Descrição do evento de início de checkout',
      content_name: 'Produto Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};

export const sendSignUpEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'SignUp',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      status: 'completed',
      category: 'Categoria Exemplo',
      level: 'gold',
      registration_method: 'email',
      num_items: 1,
      description: 'Descrição do evento de cadastro',
      content_name: 'Cadastro Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};

export const sendPurchaseEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'Purchase',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      currency: 'USD',
      value: 99.99,
      content_ids: ['product123'],
      content_type: 'product',
      order_id: 'order123',
      search_string: 'produto de exemplo',
      status: 'completed',
      level: 'gold',
      registration_method: 'email',
      max_rating_value: 5,
      num_items: 1,
      description: 'Descrição do evento de compra',
      content_name: 'Produto Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};

export const sendStartTrialEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'StartTrial',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      status: 'started',
      category: 'Categoria Exemplo',
      level: 'gold',
      registration_method: 'email',
      num_items: 1,
      description: 'Descrição do evento de início de teste',
      content_name: 'Teste Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};

export const sendViewContentEvent = async (userData: EventData['user_data'], customData?: EventData['custom_data']) => {
  const eventData: EventData = {
    event_name: 'ViewContent',
    event_time: Math.floor(new Date().getTime() / 1000),
    user_data: {
      ...userData,
      client_ip_address: '192.168.1.1',
      client_user_agent: navigator.userAgent,
      fbc: 'fb.1.1558571054389.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fbp: 'fb.1.1558571054389.1098115397',
      external_id: 'user123',
      subscription_id: 'sub123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      country: 'USA',
      fb_login_id: 'user_fb_login_id'
    },
    custom_data: {
      ...customData,
      currency: 'USD',
      value: 49.99,
      content_ids: ['content123'],
      content_type: 'product',
      order_id: 'order123',
      search_string: 'conteúdo de exemplo',
      status: 'viewed',
      level: 'gold',
      registration_method: 'email',
      max_rating_value: 5,
      num_items: 1,
      description: 'Descrição do evento de visualização de conteúdo',
      content_name: 'Conteúdo Exemplo',
      content_category: 'Categoria Exemplo',
      predicted_ltv: 500,
      delivery_category: 'standard',
      payment_info_available: 'true'
    },
    action_source: 'website',
    event_source_url: window.location.href,
  };

  await sendEventToFacebook(eventData);
};
