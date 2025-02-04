export interface EventData {
  event_name: string;
  event_time: number;
  user_data: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    address?: {
      city?: string;
      state?: string;
      country?: string;
      postal_code?: string;
    };
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
    external_id?: string;
    subscription_id?: string;
    gender?: string;
    date_of_birth?: string;
    country?: string;
    fb_login_id?: string;
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_ids?: string[];
    content_type?: string;
    order_id?: string;
    search_string?: string;
    category?: string;
    status?: string;
    level?: string;
    registration_method?: string;
    max_rating_value?: number;
    num_items?: number;
    description?: string;
    content_name?: string;
    content_category?: string;
    predicted_ltv?: number;
    delivery_category?: string;
    payment_info_available?: string;
  };
  action_source: string;
  event_source_url?: string;
}