<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" />

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap Index</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 30px 20px; line-height: 1.5; }
          .container { width: 95%; max-width: 1400px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; padding: 36px 32px; }
          .header h1 { font-size: 26px; font-weight: 700; margin-bottom: 6px; letter-spacing: -0.02em; }
          .header p { font-size: 14px; color: #e0e7ff; }
          .badge { display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-top: 14px; }
          .table-wrapper { overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
          th { background-color: #f8fafc; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; }
          td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
          tr:last-child td { border-bottom: none; }
          tr:hover { background-color: #f8fafc; }
          a { color: #4f46e5; text-decoration: none; font-weight: 500; word-break: break-all; transition: color 0.15s ease; }
          a:hover { color: #3730a3; text-decoration: underline; }
          .date { color: #64748b; font-size: 13px; font-weight: 400; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sitemap Index</h1>
            <p>XML Sitemap Index generated for search engine crawler navigation.</p>
            <div class="badge">
              Total Sitemaps: <xsl:value-of select="count(//sitemap:sitemap)"/>
            </div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 75%;">Sitemap URL</th>
                  <th style="width: 25%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="//sitemap:sitemap">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="date">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
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