# 🚀 Personal Portfolio Website

A modern, responsive personal portfolio website designed for GitHub Pages hosting. Built with vanilla HTML, CSS, and JavaScript featuring dark/light mode, smooth animations, and a mobile-first design.

## ✨ Features

- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Dark/Light Mode**: Toggle between themes with persistent localStorage
- **Smooth Animations**: Scroll-reveal effects and hover animations
- **Modern UI**: Clean design with indigo/purple color palette
- **SEO Optimized**: Semantic HTML and meta tags
- **Performance**: Optimized CSS and JavaScript with lazy loading
- **Accessibility**: ARIA labels and keyboard navigation support

## 📁 Project Structure

```
.
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet with CSS variables
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── imgs/               # Image assets
│       ├── profile-placeholder.jpg
│       ├── about-placeholder.jpg
│       ├── project1-placeholder.jpg
│       ├── project2-placeholder.jpg
│       └── project3-placeholder.jpg
└── README.md               # This file
```

## 🎨 Customization

### 1. Personal Information
Edit the following in `index.html`:
- Replace "Your Name" with your actual name
- Update the hero subtitle and description
- Modify contact information (email, phone, location)
- Update social media links (GitHub, LinkedIn)

### 2. Skills & Technologies
Update the skills section with your technologies:
```html
<div class="skill-items">
    <span class="skill-item">Your Skill</span>
    <!-- Add more skills -->
</div>
```

### 3. Projects
Replace placeholder projects with your actual work:
- Update project titles, descriptions, and tech stacks
- Replace placeholder images with screenshots
- Add live demo and GitHub repository links

### 4. Images
Replace placeholder images in `assets/imgs/`:
- `profile-placeholder.jpg` - Your profile photo (300x300px recommended)
- `about-placeholder.jpg` - About section image (400x300px)
- `project*-placeholder.jpg` - Project screenshots (400x200px)

### 5. Color Scheme
Modify CSS variables in `assets/css/style.css`:
```css
:root {
  --primary-color: #6366f1;    /* Main brand color */
  --secondary-color: #8b5cf6;  /* Accent color */
  --accent-color: #06b6d4;     /* Highlight color */
}
```

## 🖥️ Local Development

### Preview Your Site

1. **Using Python (if installed):**
   ```bash
   python -m http.server 8000
   ```
   Visit: http://localhost:8000

2. **Using Node.js serve:**
   ```bash
   npx serve .
   ```
   Visit: http://localhost:3000

3. **Using Live Server (VS Code Extension):**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

### Development Tips

- Use browser dev tools to test responsive design
- Check console for any JavaScript errors
- Test dark/light mode toggle functionality
- Verify all links and navigation work correctly

## 🚀 GitHub Pages Deployment

### Method 1: Automated Setup (Recommended)

**Prerequisites:**
- Install [GitHub CLI](https://cli.github.com/)
- Authenticate: `gh auth login`

**Copy and run these commands** (replace `<username>` with your GitHub username):

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial portfolio setup"

# Create GitHub repository and push
gh repo create <username>.github.io --public --source=. --remote=origin --push

# Enable GitHub Pages
gh api --method PATCH /repos/<username>/<username>.github.io --field homepage="https://<username>.github.io"
gh api --method POST /repos/<username>/<username>.github.io/pages --field build_type=legacy --field source[branch]=main --field source[path]=/
```

Your site will be live at: `https://<username>.github.io`

### Method 2: Manual Setup

1. **Create Repository:**
   - Go to GitHub.com
   - Create new repository named `<username>.github.io`
   - Make it public

2. **Push Code:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```

3. **Enable Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Set Source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click Save

### Method 3: GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🌐 Custom Domain & HTTPS

### Adding a Custom Domain

1. **Purchase a domain** from a registrar (Namecheap, GoDaddy, etc.)

2. **Configure DNS records:**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: <username>.github.io
   ```

3. **Add CNAME file:**
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

4. **Enable HTTPS:**
   - Go to repository Settings → Pages
   - Check "Enforce HTTPS"

### SSL Certificate
GitHub Pages automatically provides SSL certificates for custom domains. Allow 24-48 hours for propagation.

## 🛠️ Advanced Features

### Google Analytics
Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Contact Form Integration
Replace the form with a service like Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

### Blog Integration
Add a blog section using:
- GitHub Pages + Jekyll
- Netlify CMS
- External platforms (Medium, Dev.to)

## 📱 Testing & Optimization

### Performance Testing
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### Browser Testing
- Chrome DevTools device emulation
- [BrowserStack](https://www.browserstack.com/)
- Firefox Developer Edition

### SEO Optimization
- Update meta descriptions
- Add structured data
- Optimize images (WebP format)
- Generate sitemap.xml

## 🔧 Troubleshooting

### Common Issues

**Site not loading:**
- Check repository name is exactly `<username>.github.io`
- Ensure Pages is enabled in repository settings
- Wait 10-15 minutes for first deployment

**Images not displaying:**
- Verify image paths are correct
- Ensure images are committed to repository
- Check file extensions match HTML references

**Custom domain not working:**
- Verify DNS records are correct
- Clear browser cache
- Wait 24-48 hours for DNS propagation

**JavaScript not working:**
- Check browser console for errors
- Ensure script paths are correct
- Verify ES6 features are supported

## 📈 Analytics & Monitoring

### GitHub Insights
Monitor your repository's:
- Traffic and clones
- Popular content
- Referral sources

### Third-party Analytics
- Google Analytics 4
- Plausible (privacy-focused)
- Simple Analytics

## 🤝 Contributing

This template is open for improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Next Steps

After deployment:
1. ✅ Customize with your information
2. ✅ Replace placeholder images
3. ✅ Test on multiple devices
4. ✅ Set up analytics
5. ✅ Share your portfolio!

---

**Need help?** Open an issue or reach out via the contact form on your live site.

**Made with ❤️ for developers by developers**