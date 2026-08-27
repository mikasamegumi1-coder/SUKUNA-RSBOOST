import React, { useState } from "react";
import {
  LayoutDashboard,
  Swords,
  Link2,
  Youtube,
  ListVideo,
  Vault,
  Settings,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Activity,
  ImagePlus,
  Hash,
  FileText,
  Play,
  Skull,
  ToriiGate,
  Upload,
  Zap,
} from "lucide-react";

import { createRoot } from "react-dom/client";
import "./styles.css";

const domains = [
  { id: "home", label: "Jujutsu HQ", icon: LayoutDashboard },
  { id: "fetch", label: "Cursed Retrieval", icon: Link2 },
  { id: "shrine", label: "Malevolent Shrine", icon: Swords },
  { id: "youtube", label: "Cursed Broadcast", icon: Youtube },
  { id: "queue", label: "Cursed Queue", icon: ListVideo },
  { id: "vault", label: "Cursed Vault", icon: Vault },
];

function App() {
  const [page, setPage] = useState("home");
  const [url, setUrl] = useState("");
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const current = domains.find((item) => item.id === page);

  return (
    <div className="sukuna-app">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-symbol">呪</div>

          <div>
            <div className="brand-name">SUKUNA</div>
            <div className="brand-sub">
              KING OF CURSES
            </div>
          </div>
        </div>

        <div className="domain-title">
          JUJUTSU DOMAINS
        </div>

        <nav>
          {domains.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={
                  page === item.id
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() => setPage(item.id)}
              >
                <Icon size={17} />
                <span>{item.label}</span>

                {page === item.id && (
                  <ChevronRight size={14} />
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">

          <div className="uraume">
            <div className="energy-dot"></div>

            <div>
              <b>URAUME INTELLIGENCE</b>
              <small>CURSED ENERGY: STABLE</small>
            </div>
          </div>

          <button className="settings-button">
            <Settings size={15} />
            Jujutsu Configuration
          </button>

        </div>

      </aside>

      <main>

        <header className="topbar">

          <div>
            <div className="breadcrumb">
              SUKUNA / {current?.label.toUpperCase()}
            </div>

            <h1>{current?.label}</h1>
          </div>

          <div className="energy-status">
            <span></span>
            CURSED ENERGY ONLINE
          </div>

        </header>

        {page === "home" && (
          <Home
            url={url}
            setUrl={setUrl}
            notify={notify}
            openShrine={() => setPage("shrine")}
          />
        )}

        {page === "fetch" && (
          <Fetch
            url={url}
            setUrl={setUrl}
            notify={notify}
          />
        )}

        {page === "shrine" && (
          <Shrine notify={notify} />
        )}

        {page === "youtube" && (
          <Broadcast notify={notify} />
        )}

        {page === "queue" && <Queue />}

        {page === "vault" && <VaultPage />}

        {toast && (
          <div className="toast">
            {toast}
          </div>
        )}

      </main>

    </div>
  );
}


function Home({
  url,
  setUrl,
  notify,
  openShrine
}) {

  return (
    <div className="page">

      <section className="hero-domain">

        <div className="shrine-decoration shrine-left">
          <Skull size={74} />
        </div>

        <div className="shrine-decoration shrine-right">
          <Skull size={74} />
        </div>

        <div className="hero-content">

          <div className="eyebrow">
            CURSED COMMAND CENTER
          </div>

          <h2>
            MALEVOLENT
            <br />
            <span>SHRINE</span>
          </h2>

          <p>
            The central domain for your authorized
            video workflow. Retrieve, prepare,
            process and publish from one command center.
          </p>

          <div className="hero-actions">

            <button
              className="button primary"
              onClick={openShrine}
            >
              <Swords size={16} />
              Enter Malevolent Shrine
            </button>

            <button
              className="button secondary"
              onClick={() =>
                notify("Domain preview initialized")
              }
            >
              <Play size={15} />
              Preview Domain
            </button>

          </div>

        </div>

        <div className="shrine-visual">

          <div className="shrine-circle outer"></div>
          <div className="shrine-circle middle"></div>

          <div className="temple">
            <ToriiGate size={130} strokeWidth={1} />
          </div>

          <div className="temple-label">
            DOMAIN EXPANSION
            <strong>MALEVOLENT SHRINE</strong>
          </div>

        </div>

      </section>


      <section className="quick-section">

        <div className="section-heading">

          <div>
            <div className="eyebrow">
              CURSED RETRIEVAL
            </div>

            <h3>
              Summon a new source
            </h3>
          </div>

          <span>01</span>

        </div>

        <div className="url-row">

          <div className="input-box">

            <Link2 size={17} />

            <input
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="Paste authorized full-video URL..."
            />

          </div>

          <button
            className="button primary"
            onClick={() =>
              notify("Source added to temporary queue")
            }
          >
            <Zap size={15} />
            Summon
          </button>

        </div>

      </section>


      <section className="metrics">

        <Metric
          title="CURSED QUEUE"
          value="00 / 50"
        />

        <Metric
          title="PROCESSING"
          value="00"
        />

        <Metric
          title="SCHEDULED"
          value="00"
        />

        <Metric
          title="PUBLISHED"
          value="00"
        />

      </section>


      <section className="activity-section">

        <div className="section-heading">

          <div>
            <div className="eyebrow">
              CURSED ENERGY
            </div>

            <h3>
              Recent operations
            </h3>
          </div>

          <Activity size={17} />

        </div>

        <div className="empty-operation">

          <Activity size={17} />

          <span>
            No cursed operations detected.
            Your domain is ready.
          </span>

        </div>

      </section>

    </div>
  );
}


function Metric({ title, value }) {

  return (
    <div className="metric">

      <span>{title}</span>

      <b>{value}</b>

    </div>
  );
}


function Panel({
  eyebrow,
  title,
  description,
  children
}) {

  return (
    <div className="page">

      <div className="panel-heading">

        <div className="eyebrow">
          {eyebrow}
        </div>

        <h2>{title}</h2>

        <p>{description}</p>

      </div>

      {children}

    </div>
  );
}


function Fetch({
  url,
  setUrl,
  notify
}) {

  return (
    <Panel
      eyebrow="DOMAIN I — CURSED RETRIEVAL"
      title="Cursed Retrieval"
      description="Bring an authorized source into temporary SUKUNA processing."
    >

      <div className="dark-card">

        <label>
          FULL VIDEO URL
        </label>

        <div className="input-box large">

          <Link2 size={17} />

          <input
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            placeholder="Paste full-video URL..."
          />

        </div>

        <div className="notice">
          Temporary processing storage.
          Only use content you are authorized to download
          and process.
        </div>

        <button
          className="button primary"
          onClick={() =>
            notify("Retrieval request queued")
          }
        >
          <Upload size={15} />
          Begin Retrieval
        </button>

      </div>

    </Panel>
  );
}


function Shrine({ notify }) {

  return (
    <Panel
      eyebrow="DOMAIN II — MALEVOLENT SHRINE"
      title="Malevolent Shrine"
      description="Manually control the video-to-black-screen transition and text layer."
    >

      <div className="studio-grid">

        <div className="video-preview">

          <div className="preview-screen">

            <Play size={30} />

            <span>
              VIDEO PREVIEW
            </span>

            <small>
              Waiting for source
            </small>

          </div>

          <div className="timeline">

            <div className="video-part"></div>

            <div className="black-part"></div>

            <div className="time-labels">

              <span>00:00</span>
              <span>30:00</span>
              <span>60:00</span>

            </div>

          </div>

        </div>


        <div className="dark-card">

          <label>
            SHRINE START
          </label>

          <input
            className="control-input"
            defaultValue="30:00"
          />

          <label>
            BLACK SCREEN DURATION
          </label>

          <div className="duration-row">

            <input
              className="control-input"
              defaultValue="30"
            />

            <select className="control-input">
              <option>minutes</option>
              <option>seconds</option>
              <option>hours</option>
            </select>

          </div>

          <label>
            BLACK SCREEN TEXT
          </label>

          <textarea
            className="control-textarea"
            placeholder="Your message / CTA..."
          />

          <div className="button-row">

            <button
              className="button secondary"
              onClick={() =>
                notify("Shrine preview requested")
              }
            >
              <Play size={15} />
              Preview
            </button>

            <button
              className="button primary"
              onClick={() =>
                notify("Render added to queue")
              }
            >
              <Swords size={15} />
              Render Shrine
            </button>

          </div>

        </div>

      </div>

    </Panel>
  );
}


function Broadcast({ notify }) {

  return (
    <Panel
      eyebrow="DOMAIN III — CURSED BROADCAST"
      title="Cursed Broadcast"
      description="Prepare YouTube metadata, thumbnail and publishing mode."
    >

      <div className="broadcast-grid">

        <div className="dark-card">

          <label>TITLE</label>

          <input
            className="control-input"
            placeholder="Enter video title..."
          />

          <label>DESCRIPTION</label>

          <textarea
            className="control-textarea description"
            placeholder="Enter description..."
          />

          <label>HASHTAGS</label>

          <div className="input-box">

            <Hash size={16} />

            <input
              placeholder="#Dracin #DramaChina"
            />

          </div>

        </div>


        <div className="dark-card">

          <label>
            THUMBNAIL
          </label>

          <div className="thumbnail-drop">

            <ImagePlus size={28} />

            <b>
              Add thumbnail
            </b>

            <small>
              PNG / JPG
            </small>

          </div>

          <label>
            PUBLISHING MODE
          </label>

          <div className="publish-modes">

            <button className="selected">
              PRIVATE
            </button>

            <button>
              PUBLIC
            </button>

            <button>
              SCHEDULE
            </button>

          </div>

          <button
            className="button primary full"
            onClick={() =>
              notify("Broadcast added to queue")
            }
          >
            <Youtube size={15} />
            Send to Cursed Queue
          </button>

        </div>

      </div>

    </Panel>
  );
}


function Queue() {

  return (
    <Panel
      eyebrow="DOMAIN IV — CURSED QUEUE"
      title="Cursed Queue"
      description="Batch upload workspace with capacity for 50 videos."
    >

      <div className="queue-box">

        <div className="queue-header">

          <div>
            <b>00 / 50</b>
            <span> cursed videos</span>
          </div>

          <div className="queue-progress">
            <div></div>
          </div>

        </div>

        <div className="queue-empty">

          <ListVideo size={32} />

          <b>
            CURSED QUEUE IS EMPTY
          </b>

          <span>
            Rendered videos will appear here.
          </span>

        </div>

      </div>

    </Panel>
  );
}


function VaultPage() {

  const items = [
    {
      title: "Binding Vow Presets",
      icon: Swords,
      text: "Save reusable Shrine configurations."
    },
    {
      title: "Broadcast Templates",
      icon: FileText,
      text: "Store title, description and hashtag templates."
    },
    {
      title: "Cursed Images",
      icon: ImagePlus,
      text: "Manage reusable thumbnails."
    }
  ];

  return (
    <Panel
      eyebrow="DOMAIN V — CURSED VAULT"
      title="Cursed Vault"
      description="Reusable presets, publishing templates and thumbnails."
    >

      <div className="vault-grid">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <div
              className="dark-card vault-card"
              key={item.title}
            >

              <div className="vault-icon">
                <Icon size={17} />
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <button className="button secondary full">
                Manage
              </button>

            </div>
          );

        })}

      </div>

    </Panel>
  );
}


createRoot(
  document.getElementById("root")
).render(
  <App />
);
