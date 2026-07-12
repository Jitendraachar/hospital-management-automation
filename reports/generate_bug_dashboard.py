import csv
import glob
import html
import os
from collections import Counter


def esc(value: str) -> str:
    return html.escape(str(value or ""))


def badge_class(value: str, kind: str) -> str:
    v = (value or "").strip().lower()
    if kind == "sev":
        return {
            "critical": "critical",
            "high": "high",
            "medium": "medium",
            "low": "low",
        }.get(v, "default")
    if kind == "status":
        return {
            "open": "open",
            "new": "open",
            "in progress": "progress",
            "reopened": "progress",
            "closed": "closed",
            "resolved": "closed",
        }.get(v, "default")
    return "default"


def load_bug_files():
    files = sorted(glob.glob(r"excel/bug_report_*.csv"))
    all_rows = []
    by_file = []

    for file_path in files:
        with open(file_path, newline="", encoding="utf-8-sig") as file:
            reader = csv.DictReader(file)
            rows = list(reader)
        by_file.append((os.path.basename(file_path), rows))
        all_rows.extend(rows)

    return files, by_file, all_rows


def build_html(files, by_file, rows):
    severity_counter = Counter((r.get("Severity") or "Unknown").strip() or "Unknown" for r in rows)
    status_counter = Counter((r.get("Status") or "Unknown").strip() or "Unknown" for r in rows)
    module_counter = Counter((r.get("Module") or "Unknown").strip() or "Unknown" for r in rows)

    columns = [
        "Bug ID",
        "Title",
        "Module",
        "Severity",
        "Priority",
        "Environment",
        "URL",
        "Reported By",
        "Reported Date",
        "Status",
        "Preconditions",
        "Steps to Reproduce",
        "Expected Result",
        "Actual Result",
        "Evidence",
    ]

    parts = []
    parts.append(
        """<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bug Reports Dashboard</title>
  <style>
    body{font-family:Segoe UI,Arial,sans-serif;background:#f5f7fb;color:#1f2937;margin:0}
    .wrap{max-width:1200px;margin:24px auto;padding:0 16px}
    h1{margin:0 0 8px}
    .sub{color:#6b7280;margin-bottom:20px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:16px 0 24px}
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px 16px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
    .k{font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.4px}
    .v{font-size:26px;font-weight:700;margin-top:6px}
    .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
    .chip{padding:5px 10px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid #e5e7eb;background:#fff}
    .sev-critical,.status-open{background:#fee2e2;color:#991b1b;border-color:#fecaca}
    .sev-high,.status-progress{background:#ffedd5;color:#9a3412;border-color:#fed7aa}
    .sev-medium{background:#fef9c3;color:#854d0e;border-color:#fde68a}
    .sev-low,.status-closed{background:#dcfce7;color:#166534;border-color:#bbf7d0}
    .sev-default,.status-default{background:#f3f4f6;color:#374151}
    .section{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px;margin-bottom:14px}
    h2{margin:0 0 10px;font-size:18px}
    table{width:100%;border-collapse:collapse;font-size:13px}
    th,td{border:1px solid #e5e7eb;padding:8px;vertical-align:top;text-align:left}
    th{background:#f9fafb;font-weight:700}
    tr:nth-child(even){background:#fcfcfd}
    .mono{font-family:Consolas,monospace;font-size:12px;color:#374151}
    .small{font-size:12px;color:#6b7280}
    .empty{color:#6b7280;font-style:italic}
  </style>
</head>
<body>
  <div class="wrap">
"""
    )

    parts.append(
        f'<h1>Bug Reports Dashboard</h1>'
        f'<div class="sub">Consolidated visual report from <b>{len(files)}</b> CSV file(s) '
        f'in <span class="mono">excel/</span></div>'
    )

    parts.append('<div class="grid">')
    parts.append(f'<div class="card"><div class="k">Total Bug Reports</div><div class="v">{len(rows)}</div></div>')
    parts.append(f'<div class="card"><div class="k">Total Source Files</div><div class="v">{len(files)}</div></div>')

    severity_chips = "".join(
        [
            f'<span class="chip sev-{badge_class(name, "sev")}">{esc(name)}: {count}</span>'
            for name, count in sorted(severity_counter.items())
        ]
    )
    status_chips = "".join(
        [
            f'<span class="chip status-{badge_class(name, "status")}">{esc(name)}: {count}</span>'
            for name, count in sorted(status_counter.items())
        ]
    )

    parts.append(f'<div class="card"><div class="k">Severity Breakdown</div><div class="chips">{severity_chips}</div></div>')
    parts.append(f'<div class="card"><div class="k">Status Breakdown</div><div class="chips">{status_chips}</div></div>')
    parts.append("</div>")

    module_chips = "".join([f'<span class="chip">{esc(name)}: {count}</span>' for name, count in sorted(module_counter.items())])
    parts.append(f'<div class="section"><h2>Module Distribution</h2><div class="chips">{module_chips}</div></div>')

    for file_name, file_rows in by_file:
        parts.append(f'<div class="section"><h2>{esc(file_name)}</h2><div class="small">Records: <b>{len(file_rows)}</b></div>')
        if not file_rows:
            parts.append('<p class="empty">No rows found in this file.</p></div>')
            continue

        headers = "".join([f"<th>{esc(col)}</th>" for col in columns])
        parts.append(f'<div style="overflow:auto; margin-top:8px;"><table><thead><tr>{headers}</tr></thead><tbody>')

        for row in file_rows:
            parts.append("<tr>")
            for column in columns:
                value = row.get(column, "")
                if column == "Severity":
                    cls = badge_class(value, "sev")
                    parts.append(f'<td><span class="chip sev-{cls}">{esc(value)}</span></td>')
                elif column == "Status":
                    cls = badge_class(value, "status")
                    parts.append(f'<td><span class="chip status-{cls}">{esc(value)}</span></td>')
                else:
                    parts.append(f"<td>{esc(value)}</td>")
            parts.append("</tr>")

        parts.append("</tbody></table></div></div>")

    parts.append("</div></body></html>")
    return "".join(parts)


def main():
    files, by_file, all_rows = load_bug_files()
    output_path = r"reports/bug_reports_dashboard.html"
    html_content = build_html(files, by_file, all_rows)

    with open(output_path, "w", encoding="utf-8") as file:
        file.write(html_content)

    print(output_path)
    print(f"files: {len(files)} rows: {len(all_rows)}")


if __name__ == "__main__":
    main()
