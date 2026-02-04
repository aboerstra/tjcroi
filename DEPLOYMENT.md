# The Joint Corp ROI Dashboard Deployment Guide

This guide provides step-by-step instructions for deploying the ROI Dashboard application on a new server.

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- A web server (nginx, Apache, or similar)
- SSL certificate (recommended for production)

## Deployment Steps

### 1. Server Setup

1. Install Node.js and pnpm:
   ```bash
   # Install Node.js (Ubuntu/Debian)
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install pnpm
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```

2. Install a web server (nginx example):
   ```bash
   sudo apt-get update
   sudo apt-get install nginx
   ```

### 2. Application Deployment

1. Upload the `dashboard_deploy.zip` file to your server:
   ```bash
   # Using scp
   scp dashboard_deploy.zip user@your-server:/path/to/deployment
   ```

2. Extract the application:
   ```bash
   cd /path/to/deployment
   unzip dashboard_deploy.zip -d roi-dashboard
   cd roi-dashboard
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Build the application:
   ```bash
   pnpm build
   ```

### 3. Web Server Configuration

#### Nginx Configuration

1. Create a new nginx configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/roi-dashboard
   ```

2. Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/deployment/roi-dashboard/dist;
       index index.html;

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN";
       add_header X-XSS-Protection "1; mode=block";
       add_header X-Content-Type-Options "nosniff";

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location /assets {
           expires 1y;
           add_header Cache-Control "public, no-transform";
       }
   }
   ```

3. Enable the site and restart nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/roi-dashboard /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### 4. SSL Configuration (Recommended)

1. Install Certbot:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtain SSL certificate:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. Update nginx configuration to include SSL:
   ```nginx
   server {
       listen 443 ssl;
       server_name your-domain.com;
       
       ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
       
       # SSL configuration
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
       ssl_prefer_server_ciphers off;
       
       # HSTS (uncomment if you're sure)
       # add_header Strict-Transport-Security "max-age=63072000" always;
       
       # ... rest of the configuration from step 3 ...
   }

   # Redirect HTTP to HTTPS
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$server_name$request_uri;
   }
   ```

### 5. Environment Configuration

1. Create a `.env` file in the project root:
   ```bash
   touch .env
   ```

2. Add the following environment variables:
   ```env
   # Application Environment
   VITE_APP_ENV=production

   # API Configuration
   VITE_API_URL=https://api.example.com

   # Feature Flags
   VITE_ENABLE_ANALYTICS=true
   VITE_ENABLE_FEATURE_X=false

   # Build Configuration
   VITE_BUILD_TIMESTAMP=

   # Security
   VITE_ENABLE_HTTPS=true
   VITE_ALLOWED_ORIGINS=https://your-domain.com

   # Performance
   VITE_CACHE_DURATION=3600
   VITE_MAX_REQUESTS_PER_MINUTE=60
   ```

3. Update the values according to your environment:
   - Replace `https://api.example.com` with your actual API URL
   - Update `https://your-domain.com` with your actual domain
   - Adjust feature flags as needed
   - Set appropriate cache duration and rate limits

### 6. Monitoring and Maintenance

1. Set up monitoring (optional):
   ```bash
   # Install PM2 for process management
   pnpm add -g pm2
   
   # Start the application with PM2
   pm2 start npm --name "roi-dashboard" -- start
   
   # Set up PM2 to start on boot
   pm2 startup
   pm2 save
   ```

2. Regular maintenance tasks:
   ```bash
   # Update dependencies
   pnpm update
   
   # Rebuild the application
   pnpm build
   
   # Check nginx logs
   sudo tail -f /var/log/nginx/error.log
   ```

## Troubleshooting

### Common Issues

1. **Application not loading**
   - Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
   - Verify file permissions: `sudo chown -R www-data:www-data /path/to/deployment/roi-dashboard/dist`
   - Check if the build was successful: `ls -la dist/`

2. **SSL Certificate Issues**
   - Verify certificate installation: `sudo certbot certificates`
   - Check certificate expiration: `sudo certbot certificates | grep Expiry`
   - Renew certificates: `sudo certbot renew --dry-run`

3. **Performance Issues**
   - Enable nginx caching
   - Check server resources: `htop`
   - Monitor application logs: `pm2 logs`

## Security Considerations

1. Keep Node.js and pnpm updated
2. Regularly update dependencies
3. Use strong SSL configuration
4. Implement rate limiting
5. Set up proper firewall rules
6. Regular security audits

## Backup and Recovery

1. Regular backups:
   ```bash
   # Backup the application
   tar -czf roi-dashboard-backup.tar.gz /path/to/deployment/roi-dashboard
   
   # Backup nginx configuration
   sudo tar -czf nginx-config-backup.tar.gz /etc/nginx
   ```

2. Recovery procedure:
   ```bash
   # Restore application
   tar -xzf roi-dashboard-backup.tar.gz -C /path/to/deployment/
   
   # Restore nginx configuration
   sudo tar -xzf nginx-config-backup.tar.gz -C /etc/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Support

For technical support or questions about deployment, please contact:
- Technical Support: [support@example.com]
- Emergency Contact: [emergency@example.com]

## Version History

- v1.0.0 - Initial release
- v1.1.0 - Added deployment guide 