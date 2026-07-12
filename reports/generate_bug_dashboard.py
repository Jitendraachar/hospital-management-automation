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

    high_attention_count = sum(
        1
        for r in rows
        if (r.get("Severity") or "").strip().lower() in {"critical", "high"}
    )
    open_or_in_progress_count = sum(
        1
        for r in rows
        if (r.get("Status") or "").strip().lower() in {"open", "new", "in progress", "reopened"}
    )
    latest_report_date = max(
        ((r.get("Reported Date") or "").strip() for r in rows if (r.get("Reported Date") or "").strip()),
        default="N/A",
    )

    top_modules = sorted(module_counter.items(), key=lambda kv: (-kv[1], kv[0]))[:3]
    top_modules_label = ", ".join(f"{name} ({count})" for name, count in top_modules) if top_modules else "N/A"

    watchlist_rows = []
    for file_name, file_rows in by_file:
        for row in file_rows:
            sev = (row.get("Severity") or "").strip().lower()
            if sev in {"critical", "high"}:
                watchlist_rows.append((file_name, row))
    watchlist_rows.sort(
        key=lambda item: (
            0 if (item[1].get("Severity") or "").strip().lower() == "critical" else 1,
            (item[1].get("Status") or "").strip().lower(),
            item[1].get("Module") or "",
        )
    )

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
    :root{
      --bg:#0b1220;
      --panel:#121b2f;
      --panel-soft:#18233e;
      --text:#e5edff;
      --muted:#a9b6d3;
      --line:#273352;
      --accent:#22d3ee;
      --accent-2:#a78bfa;
      --ok:#22c55e;
      --warn:#f59e0b;
      --danger:#ef4444;
    }
    *{box-sizing:border-box}
    body{
      font-family:Segoe UI,Arial,sans-serif;
      background:radial-gradient(circle at top right,#1d2f52 0%,#0b1220 45%,#080d18 100%);
      color:var(--text);
      margin:0;
    }
    .wrap{max-width:1280px;margin:20px auto 28px;padding:0 16px}
    .hero{
      background:linear-gradient(135deg,rgba(34,211,238,.18),rgba(167,139,250,.22));
      border:1px solid rgba(167,139,250,.35);
      border-radius:18px;
      padding:20px;
      box-shadow:0 16px 30px rgba(0,0,0,.25);
    }
    h1{margin:0 0 8px;font-size:30px;letter-spacing:.3px}
    .sub{color:#d3def7;margin-bottom:8px}
    .pulse{
      display:inline-flex;
      align-items:center;
      gap:8px;
      background:rgba(239,68,68,.16);
      color:#fecaca;
      border:1px solid rgba(239,68,68,.4);
      border-radius:999px;
      padding:6px 12px;
      font-size:12px;
      font-weight:700;
      margin-top:8px;
    }
    .dot{
      width:8px;height:8px;border-radius:50%;
      background:#ef4444;
      box-shadow:0 0 0 0 rgba(239,68,68,.85);
      animation:pulse 1.6s infinite;
    }
    @keyframes pulse{
      0%{box-shadow:0 0 0 0 rgba(239,68,68,.85)}
      70%{box-shadow:0 0 0 10px rgba(239,68,68,0)}
      100%{box-shadow:0 0 0 0 rgba(239,68,68,0)}
    }
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:16px 0 24px}
    .card{
      background:linear-gradient(180deg,var(--panel),var(--panel-soft));
      border:1px solid var(--line);
      border-radius:14px;
      padding:14px 16px;
      box-shadow:0 8px 20px rgba(0,0,0,.2);
    }
    .card.kpi{border-color:rgba(34,211,238,.35)}
    .k{font-size:11px;color:#c5d1ef;text-transform:uppercase;letter-spacing:.7px;font-weight:700}
    .v{font-size:28px;font-weight:800;margin-top:6px;line-height:1.1}
    .v.danger{color:#fecaca}
    .v.warn{color:#fde68a}
    .v.info{color:#67e8f9}
    .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
    .chip{
      padding:5px 10px;
      border-radius:999px;
      font-size:12px;
      font-weight:700;
      border:1px solid var(--line);
      background:#0e172a;
      color:#d9e5ff;
    }
    .sev-critical,.status-open{background:rgba(239,68,68,.2);color:#fecaca;border-color:rgba(239,68,68,.45)}
    .sev-high,.status-progress{background:rgba(245,158,11,.2);color:#fde68a;border-color:rgba(245,158,11,.4)}
    .sev-medium{background:rgba(250,204,21,.18);color:#fef08a;border-color:rgba(250,204,21,.35)}
    .sev-low,.status-closed{background:rgba(34,197,94,.2);color:#bbf7d0;border-color:rgba(34,197,94,.35)}
    .sev-default,.status-default{background:rgba(148,163,184,.2);color:#cbd5e1;border-color:rgba(148,163,184,.35)}
    .section{
      background:linear-gradient(180deg,#111a2f,#0f172b);
      border:1px solid var(--line);
      border-radius:14px;
      padding:14px;
      margin-bottom:14px;
      box-shadow:0 8px 18px rgba(0,0,0,.18);
    }
    h2{margin:0 0 10px;font-size:18px;color:#dbeafe}
    table{width:100%;border-collapse:collapse;font-size:13px}
    th,td{
      border:1px solid #2a3555;
      padding:8px;
      vertical-align:top;
      text-align:left;
      color:#dbe7ff;
    }
    th{
      background:#1b2745;
      font-weight:700;
      position:sticky;
      top:0;
      z-index:1;
    }
    tr:nth-child(even){background:#121d35}
    tr:hover{background:#1a2744}
    .mono{font-family:Consolas,monospace;font-size:12px;color:#bae6fd}
    .small{font-size:12px;color:var(--muted)}
    .empty{color:var(--muted);font-style:italic}
    .watch-alert{
      border-left:4px solid var(--danger);
      background:rgba(239,68,68,.12);
      padding:10px 12px;
      border-radius:10px;
      margin-bottom:10px;
      color:#fecaca;
      font-size:13px;
      font-weight:600;
    }
  </style>
</head>
<body>
  <div class="wrap">
"""
    )

    parts.append(
        '<div class="hero">'
        f'<h1>Bug Reports Dashboard</h1>'
        f'<div class="sub">Consolidated visual report from <b>{len(files)}</b> CSV file(s) '
        f'in <span class="mono">excel/</span></div>'
        f'<div class="pulse"><span class="dot"></span> Attention Bugs: {high_attention_count} | Open / In-Progress: {open_or_in_progress_count}</div>'
        '<div class="section" style="margin-top:14px;margin-bottom:0;background:rgba(11,18,32,.45);border-color:rgba(167,139,250,.35)">'
        '<h2 style="margin-bottom:6px">QA Team Details</h2>'
        '<div class="small" style="color:#dbeafe"><b>Team Name:</b> AL Quality Quest</div>'
        '<div class="small" style="margin-top:6px;color:#dbeafe"><b>Members:</b> Jitendra Y, Shalni K, Astha Jain - QA Engineers</div>'
        '</div>'
        "</div>"
    )

    parts.append('<div class="grid">')
    parts.append(f'<div class="card kpi"><div class="k">Total Bug Reports</div><div class="v info">{len(rows)}</div></div>')
    parts.append(f'<div class="card kpi"><div class="k">Total Source Files</div><div class="v">{len(files)}</div></div>')
    parts.append(f'<div class="card"><div class="k">High/Critical Bugs</div><div class="v danger">{high_attention_count}</div></div>')
    parts.append(f'<div class="card"><div class="k">Open + In Progress</div><div class="v warn">{open_or_in_progress_count}</div></div>')
    parts.append(f'<div class="card"><div class="k">Latest Report Date</div><div class="v" style="font-size:20px">{esc(latest_report_date)}</div></div>')
    parts.append(f'<div class="card"><div class="k">Top Modules by Bug Count</div><div class="small" style="margin-top:8px">{esc(top_modules_label)}</div></div>')

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

    parts.append('<div class="section"><h2>Priority Watchlist (High/Critical)</h2>')
    if watchlist_rows:
        parts.append('<div class="watch-alert">These items should be addressed first due to higher product risk.</div>')
        parts.append(
            '<div style="overflow:auto; margin-top:8px;">'
            '<table><thead><tr><th>Bug ID</th><th>Title</th><th>Module</th><th>Severity</th><th>Status</th><th>Source File</th></tr></thead><tbody>'
        )
        for file_name, row in watchlist_rows:
            sev_value = row.get("Severity", "")
            status_value = row.get("Status", "")
            parts.append("<tr>")
            parts.append(f"<td>{esc(row.get('Bug ID', ''))}</td>")
            parts.append(f"<td>{esc(row.get('Title', ''))}</td>")
            parts.append(f"<td>{esc(row.get('Module', ''))}</td>")
            parts.append(f'<td><span class="chip sev-{badge_class(sev_value, "sev")}">{esc(sev_value)}</span></td>')
            parts.append(f'<td><span class="chip status-{badge_class(status_value, "status")}">{esc(status_value)}</span></td>')
            parts.append(f"<td>{esc(file_name)}</td>")
            parts.append("</tr>")
        parts.append("</tbody></table></div>")
    else:
        parts.append('<p class="empty">No High or Critical bugs found.</p>')
    parts.append("</div>")

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
