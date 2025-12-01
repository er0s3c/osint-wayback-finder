# 🔍 Advanced OSINT Wayback Finder

**Created by er0s3c**

A comprehensive Chrome extension for advanced Open Source Intelligence (OSINT) gathering using 14 powerful intelligence vectors. Perfect for security researchers, penetration testers, bug bounty hunters, and digital forensics professionals.

## 🎯 Overview

This tool transforms the Wayback Machine and other intelligence sources into a powerful reconnaissance platform. It combines historical web archives, threat intelligence databases, certificate transparency logs, and behavioral analysis to provide a 360-degree view of any domain's digital footprint.

## ✨ Features

### 🎨 Modern Dark Theme Interface
- Professional dark gray theme optimized for extended research sessions
- Collapsible category sections for organized workflow
- Real-time query history with timestamps
- Smooth animations and responsive design

### 📊 14 Intelligence Vectors

#### **Basic Wayback Queries** (4 vectors)
1. **Main Domain** - Complete domain archive mapping
   - `domain.com/*` - All pages under main domain
   
2. **Wildcard Domain** - Subdomain enumeration
   - `*.domain.com/*` - Discovers all subdomains and shadow IT

3. **Specific Path** - Targeted directory scanning
   - `https://domain.com/path/*` - Focus on specific sections

4. **File Extensions** - Sensitive file discovery
   - Searches for: `.pdf`, `.sql`, `.json`, `.env`, `.bak`, `.config`, `.xml`, `.xlsx`, `.doc`, `.zip`, `.tar.gz`, `.key`, `.pem`, `.crt`, and 30+ more extensions
   - Perfect for finding leaked credentials, backups, and confidential documents

#### **Advanced Wayback Queries** (4 vectors)
5. **Documents (Status 200)** - Successfully served documents only
   - Filters by HTTP 200 status code
   - MIME type filtering for PDF, Word, Excel documents
   - Digest-based deduplication for unique content

6. **Source Code Leaks** - Programming language file detection
   - Detects: PHP, Python, Java, C++, Perl source files
   - Excludes HTML to focus on backend code
   - Finds misconfigured servers exposing source code

7. **API Parameters** - API endpoint discovery
   - Finds URLs with query parameters (`?id=`, `?token=`, etc.)
   - Reveals application logic and potential injection points
   - Critical for finding IDOR and SQLi vulnerabilities

8. **JSON/XML Data** - Structured data endpoints
   - Discovers API responses and configuration files
   - Machine-readable data for automated analysis
   - Often contains database dumps and user information

#### **External Intelligence Sources** (6 vectors)
9. **Common Crawl** - Alternative web archive
   - Independent crawling infrastructure
   - Finds pages missed by Wayback Machine
   - Discovers temporary campaign sites and test environments

10. **AlienVault OTX** - Threat intelligence database
    - 100,000+ security researchers contributing
    - Identifies compromised subdomains
    - Reveals malware distribution and phishing campaigns
    - Shows historical security incidents
    - Opens web interface for full analysis

11. **CRT.sh (SSL Certificates)** - Certificate Transparency logs
    - Passive subdomain enumeration
    - Discovers internal networks (VPN, intranet)
    - No active scanning required
    - Shows infrastructure before public launch
    - Web interface with sortable results

12. **VirusTotal** - Multi-engine security analysis
    - Domain reputation and analysis
    - DNS resolution history
    - Related files and URLs
    - Community comments and votes
    - No API key required (web interface)

13. **URLScan.io** - Behavioral web analysis
    - DOM structure and JavaScript execution
    - Third-party integrations (analytics, ads)
    - Screenshot archives
    - Network request waterfall

14. **Temporal Analysis (COVID Period)** - Time-based intelligence
    - Focused on 2020-2022 pandemic period
    - Discovers crisis response pages
    - Remote work infrastructure
    - Emergency communication portals

### 💾 Query History
- Automatic saving of last 50 queries
- One-click query replay
- Timestamp tracking
- Query type categorization
- Clear history option

## 🚀 Installation

### From Chrome Web Store (Coming Soon)
1. Visit Chrome Web Store
2. Search for "Advanced OSINT Wayback Finder"
3. Click "Add to Chrome"

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the extension directory
6. The extension icon will appear in your toolbar

## 📖 Usage Guide

### Basic Workflow
1. **Enter Target URL**: Type or paste any domain/URL in the input field
   - Auto-fills with current tab URL
   - Supports with or without `https://`

2. **Select Intelligence Vector**: Click on any of the 14 query buttons
   - Categories are collapsible for clean interface
   - Each button opens results in a new tab

3. **Review Results**: Analyze the returned data
   - Wayback queries return text/JSON format
   - External sources return API responses
   - Use browser's find function (Ctrl+F) to search results

4. **Access History**: Expand the "Query History" section
   - Click any history item to re-run the query
   - See when and what type of query was executed

### Advanced Techniques

#### Subdomain Enumeration
```
1. Use "Wildcard Domain" for broad discovery
2. Cross-reference with "CRT.sh (SSL)" for validation
3. Check "AlienVault OTX" for security incidents
4. Verify with "Common Crawl" for additional coverage
```

#### Sensitive Data Discovery
```
1. Start with "File Extensions" for quick wins
2. Use "Documents (Status 200)" for confirmed files
3. Check "Source Code Leaks" for backend exposure
4. Review "JSON/XML Data" for API leaks
```

#### Threat Intelligence
```
1. Run "AlienVault OTX" for known threats
2. Check "VirusTotal" for malware associations
3. Use "URLScan.io" for behavioral analysis
4. Cross-reference findings across sources
```

## 🎓 OSINT Methodology

### Digital Archaeology Principles
This tool implements the concept of "Digital Archaeology" - the practice of recovering and analyzing deleted, archived, or hidden digital artifacts. Key principles:

- **Nothing is truly deleted**: Web archives preserve historical snapshots
- **Metadata matters**: File properties reveal organizational structure
- **Time-based analysis**: Changes over time indicate strategic shifts
- **Cross-source validation**: Multiple sources increase confidence

### Intelligence Gathering Workflow
1. **Reconnaissance**: Map the target's digital footprint
2. **Enumeration**: Discover all assets and endpoints
3. **Analysis**: Identify patterns and anomalies
4. **Validation**: Cross-reference across multiple sources
5. **Documentation**: Save findings to history for reporting

## 🔒 Security & Privacy

### Ethical Use
This tool is designed for:
- ✅ Security research on authorized targets
- ✅ Bug bounty programs
- ✅ Digital forensics investigations
- ✅ Competitive intelligence (legal)
- ✅ Academic research

**NOT for:**
- ❌ Unauthorized access attempts
- ❌ Harassment or stalking
- ❌ Corporate espionage
- ❌ Any illegal activities

### Privacy Features
- All queries run client-side
- No data sent to extension servers
- History stored locally in Chrome storage
- No tracking or analytics
- Open source for transparency

## 🛠️ Technical Details

### Architecture
- **Manifest Version**: 3 (latest Chrome standard)
- **Permissions**: `activeTab`, `storage`
- **Storage**: Chrome Local Storage API
- **UI Framework**: Vanilla JavaScript (no dependencies)
- **Styling**: Custom CSS with dark theme

### API Endpoints & Interfaces Used
- Wayback Machine CDX API (JSON/Text)
- Common Crawl Index API (JSON)
- AlienVault OTX Web Interface
- CRT.sh Web Interface
- VirusTotal Web Interface (GUI)
- URLScan.io Search API (JSON)

**Note:** Some services use web interfaces instead of APIs to avoid authentication requirements and provide better user experience.

### Performance
- Lightweight: < 100KB total size
- Fast loading: < 500ms initialization
- Efficient: Minimal memory footprint
- Responsive: Smooth animations at 60fps

## 📊 Use Cases

### Bug Bounty Hunting
- Discover forgotten admin panels
- Find exposed API keys in old configs
- Identify vulnerable file uploads
- Map attack surface comprehensively

### Penetration Testing
- Passive reconnaissance phase
- Subdomain enumeration
- Technology stack identification
- Historical vulnerability research

### Digital Forensics
- Timeline reconstruction
- Evidence preservation
- Deleted content recovery
- Attribution analysis

### Competitive Intelligence
- Product launch tracking
- Technology adoption patterns
- Strategic direction analysis
- Partnership discovery

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional intelligence sources
- Enhanced filtering options
- Export functionality (CSV, JSON)
- Automated report generation
- Integration with other OSINT tools

## 📝 Changelog

### Version 2.0 (Current)
- ✨ Added 10 new intelligence vectors
- 🎨 Complete UI redesign with dark theme
- 💾 Query history feature
- 📱 Improved responsive design
- 🔧 Enhanced error handling
- 📚 Comprehensive documentation

### Version 1.0
- 🎉 Initial release
- 4 basic Wayback queries
- Simple gradient UI

## 📄 License

MIT License - Free for personal and commercial use

## 🙏 Acknowledgments

- Internet Archive for Wayback Machine
- Common Crawl Foundation
- AlienVault for OTX platform
- Certificate Transparency project
- OSINT community

## 👨‍💻 Author

**er0s3c**
- GitHub: [@er0s3c](https://github.com/er0s3c)
- Created: 2024

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: er0s3c

---

**⚠️ Disclaimer**: This tool is provided for educational and authorized security research purposes only. Users are responsible for ensuring their use complies with applicable laws and regulations. The author assumes no liability for misuse.

**🔐 Remember**: Always obtain proper authorization before testing any systems you don't own.

---

**Made with ❤️ by er0s3c**
