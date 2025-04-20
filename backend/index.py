import google.generativeai as genai

# Directly configure the API key
api_key = "AIzaSyCGZYD-kc9BNy94EyKRzAkifTmD1FXbJC4"  # Replace with your actual API key
genai.configure(api_key=api_key)

# Create the model configuration
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 65536,
  "response_mime_type": "text/plain",
}

# Use the free-tier model
model = genai.GenerativeModel(
  model_name="gemini-2.5-pro-exp-03-25",  # Use the experimental model for free-tier
  generation_config=generation_config,
)

# Start a chat session with an empty history
chat_session = model.start_chat(
  history=[]
)

# Send the message and receive the response
response = chat_session.send_message("what is Javascript ?")

# Print the response text
print(response.text)
