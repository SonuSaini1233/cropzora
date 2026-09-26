import "./index.css";

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">🌱</div>

          <div>
            <h2>CropZora</h2>
            <span>Smart Agriculture</span>
          </div>
        </div>

        <nav className="navigation">
          <p className="nav-heading">MAIN MENU</p>

          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>📷</span>
            AI Diagnosis
          </button>

          <button className="nav-item">
            <span>🌾</span>
            My Farm
          </button>

          <button className="nav-item">
            <span>☀️</span>
            Weather
          </button>

          <button className="nav-item">
            <span>🐛</span>
            Pest Detection
          </button>

          <button className="nav-item">
            <span>🧪</span>
            Soil Health
          </button>

          <button className="nav-item">
            <span>🧮</span>
            Calculators
          </button>

          <button className="nav-item">
            <span>🛒</span>
            Market
          </button>

          <button className="nav-item">
            <span>🏛️</span>
            Government Schemes
          </button>

          <button className="nav-item">
            <span>🤖</span>
            AI Assistant
          </button>

          <button className="nav-item">
            <span>💰</span>
            Expenses
          </button>

          <button className="nav-item">
            <span>🌿</span>
            Garden
          </button>

          <p className="nav-heading system-heading">SYSTEM</p>

          <button className="nav-item">
            <span>⚙️</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="smart-card">
            <div>🌱</div>

            <div>
              <strong>Grow Smarter</strong>
              <p>AI-powered farming insights</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <div className="search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search crops, diseases, schemes..."
            />
            <button>🎙️</button>
          </div>

          <div className="top-actions">
            <button className="notification">🔔</button>

            <div className="profile">
              <div className="avatar">YS</div>

              <div>
                <strong>Farmer</strong>
                <small>My Farm</small>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <main className="content">
          <section className="welcome">
            <p className="welcome-label">WELCOME BACK 👋</p>

            <h1>
              Good morning, <span>Farmer</span>
            </h1>

            <p className="welcome-text">
              Everything you need to grow healthier crops and manage your farm
              smarter.
            </p>
          </section>

          {/* Stats */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon green">🌾</div>

              <div>
                <p>Active Crops</p>
                <h3>04</h3>
                <span>+2 this season</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">☀️</div>

              <div>
                <p>Today's Temperature</p>
                <h3>28°C</h3>
                <span>Sunny · Jaipur</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">💧</div>

              <div>
                <p>Water Required</p>
                <h3>1,240 L</h3>
                <span>For next 24 hours</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">📊</div>

              <div>
                <p>Farm Health</p>
                <h3>86%</h3>
                <span>Good condition</span>
              </div>
            </div>
          </section>

          {/* Main Grid */}
          <section className="dashboard-grid">
            {/* Weather */}
            <div className="card weather-card">
              <div className="card-header">
                <div>
                  <p className="card-label">TODAY'S WEATHER</p>
                  <h2>Jaipur, Rajasthan</h2>
                </div>

                <span className="more">•••</span>
              </div>

              <div className="weather-main">
                <div className="sun">☀️</div>

                <div>
                  <strong>28°C</strong>
                  <p>Sunny</p>
                </div>
              </div>

              <div className="weather-details">
                <div>
                  <span>Humidity</span>
                  <strong>48%</strong>
                </div>

                <div>
                  <span>Wind</span>
                  <strong>12 km/h</strong>
                </div>

                <div>
                  <span>Rain</span>
                  <strong>10%</strong>
                </div>
              </div>
            </div>

            {/* AI Doctor */}
            <div className="card ai-card">
              <div className="ai-top">
                <div className="ai-icon">🤖</div>

                <span className="ai-badge">AI POWERED</span>
              </div>

              <h2>Crop Doctor</h2>

              <p>
                Detect plant diseases, identify symptoms and get treatment
                recommendations instantly.
              </p>

              <button className="primary-button">
                📷 Start AI Diagnosis
              </button>
            </div>

            {/* Crops */}
            <div className="card crops-card">
              <div className="card-header">
                <div>
                  <p className="card-label">MY CROPS</p>
                  <h2>Growing Now</h2>
                </div>

                <button className="view-button">View All →</button>
              </div>

              <div className="crop-list">
                <div className="crop-row">
                  <div className="crop-image wheat">🌾</div>

                  <div className="crop-info">
                    <strong>Wheat</strong>
                    <span>Field A · 2.4 acres</span>
                  </div>

                  <b>82%</b>
                </div>

                <div className="crop-row">
                  <div className="crop-image tomato">🍅</div>

                  <div className="crop-info">
                    <strong>Tomato</strong>
                    <span>Field B · 1.2 acres</span>
                  </div>

                  <b>91%</b>
                </div>

                <div className="crop-row">
                  <div className="crop-image mustard">🌱</div>

                  <div className="crop-info">
                    <strong>Mustard</strong>
                    <span>Field C · 1.8 acres</span>
                  </div>

                  <b>76%</b>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card quick-card">
              <p className="card-label">QUICK ACTIONS</p>

              <h2>What do you want to do?</h2>

              <div className="quick-grid">
                <button>
                  <span>🌱</span>
                  Add Crop
                </button>

                <button>
                  <span>📷</span>
                  Diagnose
                </button>

                <button>
                  <span>🌦️</span>
                  Weather
                </button>

                <button>
                  <span>🧮</span>
                  Calculator
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;