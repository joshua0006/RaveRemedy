require 'sinatra'
require 'stripe'
require 'json'
require 'dotenv'

# Load environment variables from .env file
Dotenv.load

# Set your Stripe API key
Stripe.api_key = ENV['STRIPE_SECRET_KEY']
Stripe.api_version = '2023-10-16'

set :port, 4242
set :bind, '0.0.0.0'
set :public_folder, 'dist'

# Enable CORS
before do
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  
  if request.request_method == 'OPTIONS'
    halt 200
  end
end

# Create a Stripe Connect account
post '/api/create-connect-account' do
  content_type :json
  
  begin
    account = Stripe::Account.create({
      type: 'express',
      country: 'AU',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      },
      business_type: 'individual',
    })

    # Create an account link for onboarding
    account_link = Stripe::AccountLink.create({
      account: account.id,
      refresh_url: "#{ENV['URL'] || 'http://localhost:5173'}/connect/refresh",
      return_url: "#{ENV['URL'] || 'http://localhost:5173'}/connect/return",
      type: 'account_onboarding',
    })

    { 
      accountId: account.id,
      url: account_link.url 
    }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  rescue => e
    status 500
    { error: "Server error: #{e.message}" }.to_json
  end
end

# Create a checkout session
post '/api/create-checkout' do
  content_type :json
  
  begin
    # Parse the request body
    request_payload = JSON.parse(request.body.read)
    cart = request_payload['cart']
    
    if !cart || !cart.is_a?(Array) || cart.empty?
      status 400
      return { error: 'Missing or invalid cart data' }.to_json
    end

    # Create line items from cart
    line_items = cart.map do |item|
      {
        price: ENV['VITE_STRIPE_PRICE_ID'],
        quantity: item['quantity'] || 1,
      }
    end

    # Calculate if free shipping applies (if any item has quantity >= 2)
    qualifies_for_free_shipping = cart.any? { |item| (item['quantity'] || 1) >= 2 }
    
    # Create a checkout session
    session = Stripe::Checkout::Session.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: qualifies_for_free_shipping ? 0 : 995, # Free shipping for qualifying orders, otherwise $9.95
              currency: 'aud',
            },
            display_name: qualifies_for_free_shipping ? 'Free Express Shipping' : 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ],
      success_url: "#{ENV['URL'] || 'http://localhost:5173'}/success",
      cancel_url: "#{ENV['URL'] || 'http://localhost:5173'}/cancel",
      metadata: {
        cart_items: cart.map { |item| {
          name: item['name'],
          quantity: item['quantity'],
          flavor: item['flavor'] || '',
        }}.to_json,
      },
    })

    { id: session.id, url: session.url }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  rescue => e
    status 500
    { error: "Server error: #{e.message}" }.to_json
  end
end

# Account link creation for the Sinatra example
post '/account_link' do
  content_type :json

  body = JSON.parse(request.body.read)
  connected_account_id = body["account"]

  begin
    account_link = Stripe::AccountLink.create({
      account: connected_account_id,
      refresh_url: "#{ENV['URL'] || 'http://localhost:5173'}/connect/refresh",
      return_url: "#{ENV['URL'] || 'http://localhost:5173'}/connect/return",
      type: "account_onboarding",
    })

    {
      url: account_link.url
    }.to_json
  rescue => error
    puts "An error occurred when calling the Stripe API to create an account link: #{error.message}"
    status 500
    { error: error.message }.to_json
  end
end

# Account creation for the Sinatra example
post '/account' do
  content_type :json

  begin
    account = Stripe::Account.create({
      controller: {
        stripe_dashboard: {
          type: "none",
        },
      },
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true}
      },
      country: "AU",
    })

    {
      account: account[:id]
    }.to_json
  rescue => error
    puts "An error occurred when calling the Stripe API to create an account: #{error.message}"
    status 500
    { error: error.message }.to_json
  end
end

# Fallback route for SPA
get '/*' do
  send_file File.join(settings.public_folder, 'index.html')
end