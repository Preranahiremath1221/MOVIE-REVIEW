import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="contact-intro">
          Have questions about our movie review platform? We'd love to hear from you!
          Send us a message and we'll respond as soon as possible.
        </p>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more..."
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>

          <div className="contact-info-section">
            <h2>Get in Touch</h2>
            <div className="contact-info">
              <div className="info-item">
                <h3>📧 Email</h3>
                <p>support@moviereview.com</p>
                <p>info@moviereview.com</p>
              </div>

              <div className="info-item">
                <h3>📞 Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri: 9AM - 6PM EST</p>
              </div>

              <div className="info-item">
                <h3>📍 Address</h3>
                <p>123 Movie Street</p>
                <p>Cinema City, CC 12345</p>
                <p>United States</p>
              </div>

              <div className="info-item">
                <h3>🕒 Support Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
