<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" />

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap URLs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 30px 20px; line-height: 1.5; }
          .container { width: 95%; max-width: 1400px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff; padding: 36px 32px; }
          .header h1 { font-size: 26px; font-weight: 700; margin-bottom: 6px; letter-spacing: -0.02em; }
          .header p { font-size: 14px; color: #e0f2fe; }
          .badge { display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-top: 14px; }
          .table-wrapper { overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
          th { background-color: #f8fafc; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; }
          td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
          tr:last-child td { border-bottom: none; }
          tr:hover { background-color: #f8fafc; }
          a { color: #0284c7; text-decoration: none; font-weight: 500; word-break: break-all; transition: color 0.15s ease; }
          a:hover { color: #0369a1; text-decoration: underline; }
          .date { color: #64748b; font-size: 13px; font-weight: 400; white-space: nowrap; }
          .meta-pill { display: inline-block; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sitemap URLs</h1>
            <p>XML Sitemap containing indexed URLs for search engine discovery.</p>
            <div class="badge">
              Total URLs: <xsl:value-of select="count(//sitemap:url)"/>
            </div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <xsl:if test="//sitemap:url/sitemap:changefreq">
                    <th style="width: 15%;">Change Freq</th>
                  </xsl:if>
                  <xsl:if test="//sitemap:url/sitemap:priority">
                    <th style="width: 10%;">Priority</th>
                  </xsl:if>
                  <xsl:if test="//sitemap:url/sitemap:lastmod">
                    <th style="width: 25%;">Last Modified</th>
                  </xsl:if>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="//sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <xsl:if test="//sitemap:url/sitemap:changefreq">
                      <td>
                        <span class="meta-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                      </td>
                    </xsl:if>
                    <xsl:if test="//sitemap:url/sitemap:priority">
                      <td>
                        <span class="meta-pill"><xsl:value-of select="sitemap:priority"/></span>
                      </td>
                    </xsl:if>
                    <xsl:if test="//sitemap:url/sitemap:lastmod">
                      <td class="date">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </td>
                    </xsl:if>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>