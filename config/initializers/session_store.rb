# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_ui_test_session',
  :secret      => '87908688f3c98aaa03b096f1a240cdf5037b5d8d19505ef1468c85ebc72896784dfcb9eb50e30549dfdce4ef5529fdd9aac47d231eb441bbec5b45fc4986ece0'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
