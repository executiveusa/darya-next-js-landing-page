# Template Archive

The `/templates` directory will host curated Bootstrap 5 component packs grouped by vertical. Each pack is stored as a ZIP file containing accessible HTML markup, Radix-compatible behaviors, and metadata for AI augmentation.

## Planned Categories
- SaaS Launchpad
- E-commerce Spotlight
- Fitness & Wellness
- Professional Services
- Venture & Finance

## Manifest Structure
A `manifest.json` file will describe each template:
```json
{
  "templates": [
    {
      "id": "saas-launch-01",
      "category": "SaaS",
      "name": "Hero + Feature Grid",
      "source": "https://www.jqueryscript.net/bootstrap-5/...",
      "zip": "saas-launch-01.zip",
      "accessibility": {
        "labels": true,
        "aria": true
      }
    }
  ]
}
```

Automation for scraping and packaging templates is tracked for a future iteration.

