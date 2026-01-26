import { useState } from "react";

// ========================= */
// SEARCH COMPONENT */
// ========================= */

export const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-container" style={{ animation: 'slideInFromTop 0.4s ease-out' }}>
            <input
                type="text"
                className="search-input glassmorphic"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
                style={{ 
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    maxWidth: '300px'
                }}
            />
            <span className="search-icon">🔍</span>
        </div>
    );
};

// ========================= */
// FILTER COMPONENT */
// ========================= */

export const FilterBar = ({ filters, onFilterChange }) => {
    const [activeFilters, setActiveFilters] = useState({});

    const handleFilterClick = (filterKey, value) => {
        const updated = { ...activeFilters, [filterKey]: value };
        setActiveFilters(updated);
        onFilterChange(updated);
    };

    return (
        <div className="filter-bar glassmorphic" style={{ animation: 'slideInFromLeft 0.4s ease-out' }}>
            {filters.map((filter, idx) => (
                <div key={idx} className="filter-group stagger-item">
                    <label className="filter-label">{filter.label}</label>
                    <select 
                        className="filter-select glassmorphic"
                        onChange={(e) => handleFilterClick(filter.key, e.target.value)}
                        style={{ animation: `slideInFromLeft 0.3s ease-out ${idx * 0.1}s both` }}
                    >
                        <option value="">All</option>
                        {filter.options.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

// ========================= */
// STAT CARD COMPONENT */
// ========================= */

export const StatCard = ({ title, value, icon, color = "#58a6ff", trend = null, animated = true }) => {
    return (
        <div 
            className="stat-card glassmorphic" 
            style={{
                animation: animated ? 'slideInFromBottom 0.4s ease-out' : 'none',
                borderLeft: `4px solid ${color}`,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div className="stat-header">
                <span className="stat-icon" style={{ fontSize: '28px' }}>{icon}</span>
                <h4 className="stat-title">{title}</h4>
            </div>
            <div className="stat-value" style={{ color: color, animation: 'neonGlow 2s ease-in-out infinite' }}>
                {value}
            </div>
            {trend && (
                <div className="stat-trend" style={{ color: trend > 0 ? '#3fb950' : '#da3633' }}>
                    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </div>
            )}
        </div>
    );
};

// ========================= */
// PROGRESS BAR COMPONENT */
// ========================= */

export const ProgressBar = ({ percentage, label, color = "#238636" }) => {
    return (
        <div className="progress-container">
            <div className="progress-label">{label}</div>
            <div className="progress-bar glassmorphic" style={{ borderColor: color }}>
                <div 
                    className="progress-fill"
                    style={{
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}dd)`,
                        boxShadow: `0 0 20px ${color}80`,
                        animation: 'neonGlow 2s ease-in-out infinite'
                    }}
                />
            </div>
            <span className="progress-percentage">{percentage}%</span>
        </div>
    );
};

// ========================= */
// STATUS BADGE COMPONENT */
// ========================= */

export const StatusBadge = ({ status, size = "medium" }) => {
    const statusConfig = {
        active: { color: '#3fb950', bg: 'rgba(63, 185, 80, 0.1)', icon: '✓' },
        pending: { color: '#d29922', bg: 'rgba(210, 153, 34, 0.1)', icon: '⏳' },
        inactive: { color: '#da3633', bg: 'rgba(218, 54, 51, 0.1)', icon: '✕' },
        completed: { color: '#3fb950', bg: 'rgba(63, 185, 80, 0.1)', icon: '✓' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span
            className={`status-badge status-${status} glassmorphic`}
            style={{
                color: config.color,
                background: config.bg,
                borderColor: config.color,
                animation: 'elasticBounce 1s ease-in-out infinite',
                padding: size === 'small' ? '4px 8px' : '8px 12px',
                fontSize: size === 'small' ? '12px' : '14px'
            }}
        >
            {config.icon} {status}
        </span>
    );
};

// ========================= */
// CHART PLACEHOLDER */
// ========================= */

export const SimpleChart = ({ data, title, type = "bar" }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="chart-container glassmorphic" style={{ animation: 'fadeInScale 0.5s ease-out' }}>
            <h3 className="chart-title text-gradient">{title}</h3>
            <div className="chart-content">
                {type === "bar" && (
                    <div className="bar-chart">
                        {data.map((item, idx) => (
                            <div key={idx} className="bar-item stagger-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="bar-label">{item.label}</div>
                                <div className="bar-wrapper">
                                    <div
                                        className="bar"
                                        style={{
                                            height: `${(item.value / maxValue) * 100}%`,
                                            animation: `slideInFromBottom 0.5s ease-out ${idx * 0.1}s both`,
                                            background: `linear-gradient(180deg, #58a6ff, #238636)`,
                                            boxShadow: '0 0 20px rgba(88, 166, 255, 0.3)'
                                        }}
                                    />
                                </div>
                                <div className="bar-value">{item.value}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================= */
// ANALYTICS CARD */
// ========================= */

export const AnalyticsCard = ({ title, stats, chart }) => {
    return (
        <div className="analytics-card glassmorphic" style={{ animation: 'slideInFromRight 0.5s ease-out' }}>
            <h3 className="analytics-title">{title}</h3>
            <div className="analytics-stats">
                {stats.map((stat, idx) => (
                    <div 
                        key={idx} 
                        className="analytics-stat stagger-item"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                        <span className="stat-name">{stat.name}</span>
                        <span className="stat-num" style={{ animation: 'neonGlow 2s ease-in-out infinite' }}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
            {chart && <SimpleChart data={chart.data} title={chart.title} />}
        </div>
    );
};

// ========================= */
// ACTIVITY FEED */
// ========================= */

export const ActivityFeed = ({ activities }) => {
    return (
        <div className="activity-feed glassmorphic" style={{ animation: 'fadeInScale 0.5s ease-out' }}>
            <h3 className="activity-title">Recent Activity</h3>
            <div className="activity-list">
                {activities.map((activity, idx) => (
                    <div 
                        key={idx} 
                        className="activity-item stagger-item"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                        <div className="activity-dot" style={{ background: activity.color }} />
                        <div className="activity-content">
                            <p className="activity-action">{activity.action}</p>
                            <p className="activity-time">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========================= */
// LOADING SKELETON */
// ========================= */

export const SkeletonLoader = ({ count = 3, height = "100px" }) => {
    return (
        <div className="skeleton-container">
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    className="skeleton"
                    style={{
                        height: height,
                        marginBottom: '12px',
                        borderRadius: '8px'
                    }}
                />
            ))}
        </div>
    );
};

// ========================= */
// NOTIFICATION TOAST */
// ========================= */

export const Toast = ({ message, type = "success", onClose }) => {
    React.useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = {
        success: 'rgba(63, 185, 80, 0.1)',
        error: 'rgba(218, 54, 51, 0.1)',
        warning: 'rgba(210, 153, 34, 0.1)',
        info: 'rgba(88, 166, 255, 0.1)'
    };

    const borderColor = {
        success: '#3fb950',
        error: '#da3633',
        warning: '#d29922',
        info: '#58a6ff'
    };

    return (
        <div 
            className="toast glassmorphic"
            style={{
                background: bgColor[type],
                borderLeft: `4px solid ${borderColor[type]}`,
                animation: 'slideInNotification 0.4s ease-out'
            }}
        >
            {message}
        </div>
    );
};
