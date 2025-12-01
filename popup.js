/**
 * Advanced OSINT Wayback Finder
 * Created by er0s3c
 * GitHub: https://github.com/er0s3c
 * 
 * This extension provides 14 intelligence vectors for OSINT research
 * including Wayback Machine, Common Crawl, threat intelligence, and more.
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("urlInput");
  const toast = document.getElementById("toast");
  const historyList = document.getElementById("historyList");
  const historyCount = document.getElementById("historyCount");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");

  // Button references
  const buttons = {
    // Basic Wayback
    domain: document.getElementById("domainBtn"),
    wildcard: document.getElementById("wildcardBtn"),
    specific: document.getElementById("specificBtn"),
    extensions: document.getElementById("extensionsBtn"),
    // Advanced Wayback
    advDocuments: document.getElementById("advDocumentsBtn"),
    sourceCode: document.getElementById("sourceCodeBtn"),
    apiParams: document.getElementById("apiParamsBtn"),
    jsonXml: document.getElementById("jsonXmlBtn"),
    // External Intelligence
    commonCrawl: document.getElementById("commonCrawlBtn"),
    alienVault: document.getElementById("alienVaultBtn"),
    crtSh: document.getElementById("crtShBtn"),
    virusTotal: document.getElementById("virusTotalBtn"),
    urlScan: document.getElementById("urlScanBtn"),
    temporal: document.getElementById("temporalBtn")
  };

  // Set current tab URL by default
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url) {
      urlInput.value = currentTab.url;
    }
  });

  // Load and display history
  loadHistory();

  // Category toggle functionality
  const categoryHeaders = document.querySelectorAll(".category-header");
  categoryHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const toggleIcon = header.querySelector(".toggle-icon");
      
      content.classList.toggle("expanded");
      toggleIcon.classList.toggle("rotated");
      header.classList.toggle("active");
    });
  });

  // Show toast notification
  function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Set button loading state
  function setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.classList.add("loading");
      button.disabled = true;
    } else {
      button.classList.remove("loading");
      button.disabled = false;
    }
  }

  // Save to history
  function saveToHistory(url, type, queryUrl) {
    chrome.storage.local.get(['queryHistory'], (result) => {
      let history = result.queryHistory || [];
      
      const newEntry = {
        url: url,
        type: type,
        queryUrl: queryUrl,
        timestamp: new Date().toISOString()
      };

      // Add to beginning and limit to 50 entries
      history.unshift(newEntry);
      history = history.slice(0, 50);

      chrome.storage.local.set({ queryHistory: history }, () => {
        loadHistory();
      });
    });
  }

  // Load history from storage
  function loadHistory() {
    chrome.storage.local.get(['queryHistory'], (result) => {
      const history = result.queryHistory || [];
      historyCount.textContent = history.length;

      if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">No queries yet. Start exploring!</div>';
        return;
      }

      historyList.innerHTML = history.map((entry, index) => {
        const date = new Date(entry.timestamp);
        const timeAgo = getTimeAgo(date);
        
        return `
          <div class="history-item" data-index="${index}">
            <div class="history-item-content">
              <div class="history-item-url">${entry.url}</div>
              <div class="history-item-meta">
                <span class="history-item-type">${entry.type}</span>
                <span>•</span>
                <span>${timeAgo}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Add click handlers to history items
      document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
          const index = parseInt(item.dataset.index);
          const entry = history[index];
          chrome.tabs.create({ url: entry.queryUrl });
          showToast('Reopening query...', 'success');
        });
      });
    });
  }

  // Clear history
  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all query history?')) {
      chrome.storage.local.set({ queryHistory: [] }, () => {
        loadHistory();
        showToast('History cleared', 'success');
      });
    }
  });

  // Get time ago string
  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  // Extract domain from URL
  function extractDomain(urlString) {
    try {
      const url = new URL(urlString.match(/^https?:\/\//i) ? urlString : 'https://' + urlString);
      return url.hostname;
    } catch {
      return urlString;
    }
  }

  // Main query function
  async function executeQuery(type) {
    let urlToInsert = urlInput.value.trim();
    if (!urlToInsert) {
      showToast("Please enter a URL", 'error');
      return;
    }

    // Check if the URL has a protocol, if not add https://
    if (!urlToInsert.match(/^https?:\/\//i)) {
      urlToInsert = "https://" + urlToInsert;
    }

    let finalURL = "";
    let button = buttons[type];
    let queryType = "";

    try {
      const parsedURL = new URL(urlToInsert);
      const hostname = parsedURL.hostname;
      const fullURL = parsedURL.origin + parsedURL.pathname;

      // Basic Wayback Queries
      if (type === "domain") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=${hostname}/*&collapse=urlkey&output=text&fl=original`;
        queryType = "Main Domain";
      } 
      else if (type === "wildcard") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=*.${hostname}/*&collapse=urlkey&output=text&fl=original`;
        queryType = "Wildcard Domain";
      } 
      else if (type === "specific") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=${fullURL}/*&collapse=urlkey&output=text&fl=original`;
        queryType = "Specific Path";
      } 
      else if (type === "extensions") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=*.${hostname}/*&collapse=urlkey&output=text&fl=original&filter=original:.*\\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|zip|tar\\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|git|config|csv|yaml|md|md5|exe|dll|bin|ini|bat|sh|tar|deb|rpm|iso|img|apk|msi|env|dmg|tmp|crt|pem|key|pub|asc)$`;
        queryType = "File Extensions";
      }
      // Advanced Wayback Queries
      else if (type === "advDocuments") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=*.${hostname}/*&filter=statuscode:200&filter=mimetype:application/.*(pdf|msword|vnd.ms-excel|vnd.openxmlformats).*&collapse=digest&output=json`;
        queryType = "Advanced Documents (Status 200)";
      }
      else if (type === "sourceCode") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=*.${hostname}/*&filter=mimetype:text/x-(c\\+\\+|c|java|python|script|php|perl).*&filter=!mimetype:text/html&output=json`;
        queryType = "Source Code Leaks";
      }
      else if (type === "apiParams") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=*.${hostname}/*&matchType=prefix&filter=original:.*\\?.*&collapse=urlkey&output=json`;
        queryType = "API Parameters";
      }
      else if (type === "jsonXml") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=*.${hostname}/*&filter=mimetype:application/(json|xml).*&filter=statuscode:200&output=json`;
        queryType = "JSON/XML Endpoints";
      }
      // External Intelligence Sources
      else if (type === "commonCrawl") {
        // Use latest Common Crawl index
        finalURL = `https://index.commoncrawl.org/CC-MAIN-2024-51-index?url=*.${hostname}&output=json`;
        queryType = "Common Crawl Index";
      }
      else if (type === "alienVault") {
        // AlienVault web interface instead of API
        finalURL = `https://otx.alienvault.com/indicator/domain/${hostname}`;
        queryType = "AlienVault OTX Threat Intel";
      }
      else if (type === "crtSh") {
        // CRT.sh web interface with better results
        finalURL = `https://crt.sh/?q=%.${hostname}`;
        queryType = "Certificate Transparency (CRT.sh)";
      }
      else if (type === "virusTotal") {
        // VirusTotal main domain page (no API key needed)
        finalURL = `https://www.virustotal.com/gui/domain/${hostname}/details`;
        queryType = "VirusTotal Domain Analysis";
      }
      else if (type === "urlScan") {
        finalURL = `https://urlscan.io/api/v1/search/?q=domain:${hostname}&size=100`;
        queryType = "URLScan.io Analysis";
      }
      else if (type === "temporal") {
        finalURL = `https://web.archive.org/cdx/search/cdx?url=${hostname}/*&from=20200101&to=20220101&filter=statuscode:200&fl=original,timestamp,mimetype&output=json`;
        queryType = "Temporal Analysis (COVID Period)";
      }

      // Set loading state
      setButtonLoading(button, true);

      // Open the URL after a short delay
      setTimeout(async () => {
        try {
          // Open in background (don't switch to new tab)
          await chrome.tabs.create({ url: finalURL, active: false });
          showToast(`Opening ${queryType}...`, 'success');
          
          // Save to history
          saveToHistory(hostname, queryType, finalURL);
        } catch (error) {
          showToast("Failed to open tab. Please check permissions.", 'error');
        } finally {
          setButtonLoading(button, false);
        }
      }, 500);

    } catch (error) {
      showToast("Invalid URL format. Please enter a valid URL.", 'error');
      setButtonLoading(button, false);
      return;
    }
  }

  // Attach event listeners to all buttons
  Object.keys(buttons).forEach(type => {
    if (buttons[type]) {
      // Left click
      buttons[type].addEventListener("click", () => executeQuery(type));
      
      // Middle click (mouse wheel) - open in new tab
      buttons[type].addEventListener("mousedown", (e) => {
        if (e.button === 1) { // Middle mouse button
          e.preventDefault();
          executeQuery(type);
        }
      });
      
      // Prevent default middle click behavior
      buttons[type].addEventListener("auxclick", (e) => {
        if (e.button === 1) {
          e.preventDefault();
        }
      });
    }
  });

  // Enter key support
  urlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      executeQuery("domain");
    }
  });
});
